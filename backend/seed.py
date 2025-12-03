from app.core.database import SessionLocal, engine, Base
from app.models.user import User, UserRole
from app.models.hotel import Hotel, Room
from app.models.booking import Booking
from app.core.security import get_password_hash
from datetime import date, timedelta
import random

# Create tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

def seed_data():
    print("🌱 Starting database seeding...")

    # --- 1. Users ---
    print("Creating Users...")
    
    # Admin
    admin = db.query(User).filter(User.email == "admin@example.com").first()
    if not admin:
        admin = User(
            email="admin@example.com",
            hashed_password=get_password_hash("admin123"),
            full_name="System Admin",
            role=UserRole.ADMIN,
            is_active=True
        )
        db.add(admin)
    
    # Managers
    managers = []
    for i in range(1, 4):
        email = f"manager{i}@example.com"
        manager = db.query(User).filter(User.email == email).first()
        if not manager:
            manager = User(
                email=email,
                hashed_password=get_password_hash("manager123"),
                full_name=f"Manager {i}",
                role=UserRole.MANAGER,
                is_active=True
            )
            db.add(manager)
        managers.append(manager)
    
    # Guests
    guests = []
    for i in range(1, 6):
        email = f"guest{i}@example.com"
        guest = db.query(User).filter(User.email == email).first()
        if not guest:
            guest = User(
                email=email,
                hashed_password=get_password_hash("guest123"),
                full_name=f"Guest User {i}",
                role=UserRole.GUEST,
                is_active=True
            )
            db.add(guest)
        guests.append(guest)
    
    db.commit()
    
    # Refresh objects to get IDs
    admin = db.query(User).filter(User.email == "admin@example.com").first()
    managers = [db.query(User).filter(User.email == f"manager{i}@example.com").first() for i in range(1, 4)]
    guests = [db.query(User).filter(User.email == f"guest{i}@example.com").first() for i in range(1, 6)]

    # --- 2. Hotels ---
    print("Creating Hotels...")
    
    hotel_data = [
        {
            "name": "Grand Plaza Hotel",
            "location": "New York, NY",
            "description": "Luxury hotel in the heart of Manhattan with skyline views.",
            "image_url": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            "manager": managers[0]
        },
        {
            "name": "Seaside Resort & Spa",
            "location": "Miami, FL",
            "description": "Relaxing beachfront resort with all-inclusive amenities.",
            "image_url": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            "manager": managers[1]
        },
        {
            "name": "Mountain View Lodge",
            "location": "Aspen, CO",
            "description": "Cozy lodge perfect for skiing and winter getaways.",
            "image_url": "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            "manager": managers[2]
        },
        {
            "name": "Urban Boutique Hotel",
            "location": "San Francisco, CA",
            "description": "Modern and chic hotel in the downtown district.",
            "image_url": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            "manager": managers[0] # Manager 1 manages two hotels
        }
    ]

    hotels = []
    for h_data in hotel_data:
        hotel = db.query(Hotel).filter(Hotel.name == h_data["name"]).first()
        if not hotel:
            hotel = Hotel(
                name=h_data["name"],
                location=h_data["location"],
                description=h_data["description"],
                image_url=h_data["image_url"],
                manager_id=h_data["manager"].id
            )
            db.add(hotel)
            db.commit()
            db.refresh(hotel)
        hotels.append(hotel)

    # --- 3. Rooms ---
    print("Creating Rooms...")
    
    room_types = [
        {"type": "Single", "price_range": (80, 120), "desc": "Cozy single room for solo travelers."},
        {"type": "Double", "price_range": (130, 180), "desc": "Spacious room with two beds."},
        {"type": "King Suite", "price_range": (200, 300), "desc": "Luxury suite with a king-sized bed and city view."},
        {"type": "Penthouse", "price_range": (500, 1000), "desc": "Top floor penthouse with premium amenities."}
    ]

    all_rooms = []
    for hotel in hotels:
        # Check if hotel already has rooms
        existing_rooms = db.query(Room).filter(Room.hotel_id == hotel.id).count()
        if existing_rooms < 5:
            for i in range(1, 11): # 10 rooms per hotel
                r_type = random.choice(room_types)
                price = random.randint(r_type["price_range"][0], r_type["price_range"][1])
                room = Room(
                    hotel_id=hotel.id,
                    room_number=f"{100 + i}",
                    type=r_type["type"],
                    price=float(price),
                    capacity=random.randint(1, 4),
                    description=r_type["desc"],
                    is_available=True
                )
                db.add(room)
                all_rooms.append(room)
            db.commit()
    
    # Refresh rooms list
    all_rooms = db.query(Room).all()

    # --- 4. Bookings ---
    print("Creating Bookings...")
    
    # Check existing bookings
    if db.query(Booking).count() < 10:
        statuses = ["confirmed", "pending", "cancelled", "completed"]
        
        for _ in range(25): # Create 25 random bookings
            guest = random.choice(guests)
            room = random.choice(all_rooms)
            
            # Random dates
            start_date = date.today() + timedelta(days=random.randint(-30, 30))
            duration = random.randint(1, 7)
            end_date = start_date + timedelta(days=duration)
            
            status = random.choice(statuses)
            
            # Calculate total price
            total_price = room.price * duration
            
            booking = Booking(
                user_id=guest.id,
                room_id=room.id,
                check_in=start_date,
                check_out=end_date,
                total_price=total_price,
                status=status
            )
            db.add(booking)
        
        db.commit()

    print("✅ Seed data generation complete!")
    print(f"   - Admins: 1")
    print(f"   - Managers: {len(managers)}")
    print(f"   - Guests: {len(guests)}")
    print(f"   - Hotels: {len(hotels)}")
    print(f"   - Rooms: {len(all_rooms)}")
    print(f"   - Bookings: {db.query(Booking).count()}")

if __name__ == "__main__":
    try:
        seed_data()
    finally:
        db.close()
