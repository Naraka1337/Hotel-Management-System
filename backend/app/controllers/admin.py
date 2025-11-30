from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.user import User, UserRole
from app.models.hotel import Hotel
from app.schemas.user import User as UserSchema, UserUpdate
from app.schemas.hotel import Hotel as HotelSchema, HotelCreate, HotelBase, HotelUpdate
from app.controllers.auth import get_current_user

router = APIRouter()

# Dependency to check if user is admin
def get_current_admin(current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized")
    return current_user

from sqlalchemy import func
from app.models.booking import Booking

@router.get("/dashboard")
def get_admin_dashboard(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin)):
    total_users = db.query(User).count()
    total_hotels = db.query(Hotel).count()
    total_bookings = db.query(Booking).count()
    revenue = db.query(func.sum(Booking.total_price)).scalar() or 0
    active_users = db.query(User).filter(User.is_active == True).count()
    
    # Get recent bookings with details
    recent_bookings_query = db.query(Booking).order_by(Booking.id.desc()).limit(5).all()
    recent_bookings = []
    for b in recent_bookings_query:
        # Fetch related data manually if relationships aren't eager loaded or to format it
        # Assuming relationships are set up in models, but let's be safe and query or access attributes
        # We need: hotel name, guest name, checkIn, checkOut, amount, status
        # Booking model has user_id and room_id. Room has hotel_id.
        
        # We need to join or access relationships. 
        # Let's assume lazy loading works or do a join if needed.
        # For simplicity, accessing attributes (which triggers lazy load)
        
        hotel_name = "Unknown"
        guest_name = "Unknown"
        
        if b.room and b.room.hotel:
            hotel_name = b.room.hotel.name
        
        if b.user:
            guest_name = b.user.full_name or b.user.email
            
        recent_bookings.append({
            "id": b.id,
            "hotel": hotel_name,
            "guest": guest_name,
            "checkIn": b.check_in,
            "checkOut": b.check_out,
            "amount": b.total_price,
            "status": b.status.capitalize() if b.status else "Pending"
        })

    return {
        "total_users": total_users,
        "total_hotels": total_hotels,
        "total_bookings": total_bookings,
        "revenue": revenue,
        "active_users": active_users,
        "recent_bookings": recent_bookings
    }

@router.get("/users", response_model=List[UserSchema])
def get_all_users(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin)):
    return db.query(User).all()

@router.get("/hotels", response_model=List[HotelSchema])
def get_all_hotels(db: Session = Depends(get_db), current_user: User = Depends(get_current_admin)):
    return db.query(Hotel).all()

@router.post("/hotels", response_model=HotelSchema)
def create_hotel(hotel: HotelCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin)):
    db_hotel = Hotel(**hotel.model_dump())
    db.add(db_hotel)
    db.commit()
    db.refresh(db_hotel)
    return db_hotel

@router.delete("/hotels/{hotel_id}")
def delete_hotel(hotel_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin)):
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")
    db.delete(hotel)
    db.commit()
    return {"message": "Hotel deleted"}

@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot delete yourself")
    
    db.delete(user)
    db.commit()
    db.delete(user)
    db.commit()
    return {"message": "User deleted"}

from app.schemas.user import UserCreate
from app.core.security import get_password_hash

@router.post("/users", response_model=UserSchema)
def create_user(user: UserCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = User(
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name,
        role=user.role,
        is_active=True
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.put("/hotels/{hotel_id}", response_model=HotelSchema)
def update_hotel(hotel_id: int, hotel_update: HotelUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin)):
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")
    
    update_data = hotel_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(hotel, key, value)
    
    db.commit()
    db.refresh(hotel)
    return hotel

@router.put("/users/{user_id}", response_model=UserSchema)
def update_user(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_admin)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    update_data = user_update.model_dump(exclude_unset=True)
    if "password" in update_data and update_data["password"]:
        update_data["hashed_password"] = get_password_hash(update_data.pop("password"))
        
    for key, value in update_data.items():
        setattr(user, key, value)
    
    db.commit()
    db.refresh(user)
    return user
