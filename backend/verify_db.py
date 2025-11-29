from app.core.database import SessionLocal
from app.models.hotel import Hotel
from app.models.user import User

db = SessionLocal()
try:
    users = db.query(User).all()
    hotels = db.query(Hotel).all()
    
    print(f"Users found: {len(users)}")
    for u in users:
        print(f" - {u.email} ({u.role})")
        
    print(f"\nHotels found: {len(hotels)}")
    for h in hotels:
        print(f" - {h.name} (Manager: {h.manager_id})")
finally:
    db.close()
