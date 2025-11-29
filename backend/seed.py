from app.core.database import SessionLocal, engine, Base
from app.models.user import User, UserRole
from app.models.hotel import Hotel, Room
from app.core.security import get_password_hash

# Create tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

def seed_data():
    # Check/Create Admin
    admin = db.query(User).filter(User.email == "admin@example.com").first()
    if not admin:
        print("Creating Admin...")
        admin = User(
            email="admin@example.com",
            hashed_password=get_password_hash("admin123"),
            full_name="System Admin",
            role=UserRole.ADMIN
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)

    # Check/Create Manager
    manager = db.query(User).filter(User.email == "manager@example.com").first()
    if not manager:
        print("Creating Manager...")
        manager = User(
            email="manager@example.com",
            hashed_password=get_password_hash("manager123"),
            full_name="Hotel Manager",
            role=UserRole.MANAGER
        )
        db.add(manager)
        db.commit()
        db.refresh(manager)

    # Check/Create Guest
    guest = db.query(User).filter(User.email == "guest@example.com").first()
    if not guest:
        print("Creating Guest...")
        guest = User(
            email="guest@example.com",
            hashed_password=get_password_hash("guest123"),
            full_name="John Guest",
            role=UserRole.GUEST
        )
        db.add(guest)
        db.commit()
    
    print("Checking hotels...")
    
    # Hotel 1: Grand Plaza (Managed by Manager)
    hotel1 = db.query(Hotel).filter(Hotel.name == "Grand Plaza Hotel").first()
    if not hotel1:
        print("Creating Grand Plaza Hotel...")
        hotel1 = Hotel(
            name="Grand Plaza Hotel",
            location="New York, NY",
            description="Luxury hotel in the heart of the city.",
            image_url="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            manager_id=manager.id
        )
        db.add(hotel1)
        db.commit()
        db.refresh(hotel1)
        
        # Rooms for Hotel 1
        rooms1 = [
            Room(hotel_id=hotel1.id, room_number="101", type="Single", price=100.0, description="Cozy single room"),
            Room(hotel_id=hotel1.id, room_number="102", type="Double", price=150.0, description="Spacious double room"),
            Room(hotel_id=hotel1.id, room_number="201", type="Suite", price=300.0, description="Luxury suite with city view"),
        ]
        db.add_all(rooms1)
        db.commit()
    else:
        # Ensure manager is correct if it already exists
        if hotel1.manager_id != manager.id:
            print("Updating Grand Plaza manager...")
            hotel1.manager_id = manager.id
            db.commit()

    # Hotel 2: Seaside Resort (Managed by Admin - so Manager can't see it)
    hotel2 = db.query(Hotel).filter(Hotel.name == "Seaside Resort").first()
    if not hotel2:
        print("Creating Seaside Resort...")
        hotel2 = Hotel(
            name="Seaside Resort",
            location="Miami, FL",
            description="Beautiful resort by the ocean.",
            image_url="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            manager_id=admin.id 
        )
        db.add(hotel2)
        db.commit()
        db.refresh(hotel2)

        # Rooms for Hotel 2
        rooms2 = [
            Room(hotel_id=hotel2.id, room_number="101", type="Single", price=120.0, description="Ocean view single"),
            Room(hotel_id=hotel2.id, room_number="102", type="Double", price=180.0, description="Ocean view double"),
        ]
        db.add_all(rooms2)
        db.commit()

    print("Seed data check/update complete!")

if __name__ == "__main__":
    try:
        seed_data()
    finally:
        db.close()
