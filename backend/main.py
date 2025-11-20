from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, String, Integer, Float, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from typing import Optional, List
import uuid

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./hotel.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Security
SECRET_KEY = "your-secret-key-change-this-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

# FastAPI app
app = FastAPI(title="Hotel Management API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Models
class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    name = Column(String)
    role = Column(String, default="guest")  # admin, manager, guest
    is_active = Column(Boolean, default=True)

class Hotel(Base):
    __tablename__ = "hotels"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String)
    address = Column(String)
    city = Column(String)
    description = Column(String)
    rating = Column(Float, default=0.0)
    manager_id = Column(String, ForeignKey("users.id"), nullable=True)

class Room(Base):
    __tablename__ = "rooms"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    hotel_id = Column(String, ForeignKey("hotels.id"))
    room_number = Column(String)
    room_type = Column(String)
    price_per_night = Column(Float)
    max_guests = Column(Integer)
    status = Column(String, default="available")  # available, occupied, maintenance

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    hotel_id = Column(String, ForeignKey("hotels.id"))
    room_id = Column(String, ForeignKey("rooms.id"))
    guest_id = Column(String, ForeignKey("users.id"))
    check_in_date = Column(String)
    check_out_date = Column(String)
    total_price = Column(Float)
    status = Column(String, default="pending")  # pending, confirmed, cancelled

# Create tables
Base.metadata.create_all(bind=engine)

# Pydantic schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str
    role: Optional[str] = "guest"

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    role: str
    class Config:
        from_attributes = True

class HotelCreate(BaseModel):
    name: str
    address: str
    city: str
    description: Optional[str] = None

class HotelResponse(BaseModel):
    id: str
    name: str
    address: str
    city: str
    description: Optional[str]
    rating: float
    class Config:
        from_attributes = True

class RoomCreate(BaseModel):
    hotel_id: str
    room_number: str
    room_type: str
    price_per_night: float
    max_guests: int

class RoomResponse(BaseModel):
    id: str
    hotel_id: str
    room_number: str
    room_type: str
    price_per_night: float
    max_guests: int
    status: str
    class Config:
        from_attributes = True

class BookingCreate(BaseModel):
    hotel_id: str
    room_id: str
    check_in_date: str
    check_out_date: str

class BookingResponse(BaseModel):
    id: str
    hotel_id: str
    room_id: str
    guest_id: str
    check_in_date: str
    check_out_date: str
    total_price: float
    status: str
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# Helper functions
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid credentials"
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
    return user

# Routes
@app.post("/api/auth/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    db_user = User(
        email=user.email,
        password_hash=get_password_hash(user.password),
        name=user.name,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/api/auth/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    access_token = create_token(data={"sub": user.id})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/auth/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

# Public routes
@app.get("/api/public/hotels", response_model=List[HotelResponse])
def get_hotels(db: Session = Depends(get_db)):
    return db.query(Hotel).all()

@app.get("/api/public/hotels/{hotel_id}", response_model=HotelResponse)
def get_hotel(hotel_id: str, db: Session = Depends(get_db)):
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")
    return hotel

@app.get("/api/public/hotels/{hotel_id}/rooms", response_model=List[RoomResponse])
def get_rooms(hotel_id: str, db: Session = Depends(get_db)):
    return db.query(Room).filter(Room.hotel_id == hotel_id, Room.status == "available").all()

@app.post("/api/public/bookings", response_model=BookingResponse)
def create_booking(booking: BookingCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Get room to calculate price
    room = db.query(Room).filter(Room.id == booking.room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    
    # Calculate days and total price
    from datetime import datetime
    check_in = datetime.strptime(booking.check_in_date, "%Y-%m-%d")
    check_out = datetime.strptime(booking.check_out_date, "%Y-%m-%d")
    days = (check_out - check_in).days
    total_price = room.price_per_night * days
    
    db_booking = Booking(
        hotel_id=booking.hotel_id,
        room_id=booking.room_id,
        guest_id=current_user.id,
        check_in_date=booking.check_in_date,
        check_out_date=booking.check_out_date,
        total_price=total_price
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

# Manager routes
@app.get("/api/manager/dashboard")
def manager_dashboard(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Access denied")
    
    hotels = db.query(Hotel).filter(Hotel.manager_id == current_user.id).all()
    bookings = db.query(Booking).join(Room).join(Hotel).filter(Hotel.manager_id == current_user.id).all()
    
    return {
        "hotels_count": len(hotels),
        "bookings_count": len(bookings),
        "hotels": hotels
    }

@app.get("/api/manager/rooms", response_model=List[RoomResponse])
def get_manager_rooms(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Access denied")
    
    hotels = db.query(Hotel).filter(Hotel.manager_id == current_user.id).all()
    hotel_ids = [h.id for h in hotels]
    return db.query(Room).filter(Room.hotel_id.in_(hotel_ids)).all()

@app.post("/api/manager/rooms", response_model=RoomResponse)
def create_room(room: RoomCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Verify hotel belongs to manager
    hotel = db.query(Hotel).filter(Hotel.id == room.hotel_id, Hotel.manager_id == current_user.id).first()
    if not hotel:
        raise HTTPException(status_code=403, detail="Hotel not found or access denied")
    
    db_room = Room(**room.dict())
    db.add(db_room)
    db.commit()
    db.refresh(db_room)
    return db_room

# Admin routes
@app.get("/api/admin/dashboard")
def admin_dashboard(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Access denied")
    
    users_count = db.query(User).count()
    hotels_count = db.query(Hotel).count()
    bookings_count = db.query(Booking).count()
    
    return {
        "users_count": users_count,
        "hotels_count": hotels_count,
        "bookings_count": bookings_count
    }

@app.get("/api/admin/hotels", response_model=List[HotelResponse])
def get_all_hotels(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Access denied")
    return db.query(Hotel).all()

@app.get("/api/admin/users", response_model=List[UserResponse])
def get_all_users(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Access denied")
    return db.query(User).all()

@app.get("/")
def root():
    return {"message": "Hotel Management API", "docs": "/docs"}

