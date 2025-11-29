from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.user import User, UserRole
from app.models.hotel import Hotel, Room
from app.schemas.hotel import Room as RoomSchema, RoomCreate, Hotel as HotelSchema
from app.controllers.auth import get_current_user

router = APIRouter()

# Dependency to check if user is manager
def get_current_manager(current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.MANAGER and current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized")
    return current_user

from sqlalchemy import func
from datetime import date
from app.models.booking import Booking

@router.get("/dashboard")
def get_manager_dashboard(db: Session = Depends(get_db), current_user: User = Depends(get_current_manager)):
    # Get hotels managed by this user
    hotels = db.query(Hotel).filter(Hotel.manager_id == current_user.id).all()
    hotel_ids = [h.id for h in hotels]
    
    # Get rooms for these hotels
    rooms = db.query(Room).filter(Room.hotel_id.in_(hotel_ids)).all()
    room_ids = [r.id for r in rooms]
    total_rooms = len(rooms)
    
    # Calculate stats
    if not room_ids:
        return {
            "total_hotels": len(hotels),
            "total_rooms": 0,
            "total_bookings": 0,
            "revenue": 0,
            "occupancy": "0%",
            "recent_bookings": []
        }

    # Total Bookings for these rooms
    total_bookings = db.query(Booking).filter(Booking.room_id.in_(room_ids)).count()
    
    # Revenue
    revenue = db.query(func.sum(Booking.total_price)).filter(Booking.room_id.in_(room_ids)).scalar() or 0
    
    # Occupancy (Active bookings today / Total rooms)
    today = date.today()
    active_bookings = db.query(Booking).filter(
        Booking.room_id.in_(room_ids),
        Booking.check_in <= today,
        Booking.check_out >= today
    ).count()
    
    occupancy_rate = 0
    if total_rooms > 0:
        occupancy_rate = int((active_bookings / total_rooms) * 100)
        
    # Recent Bookings
    recent_bookings_query = db.query(Booking).filter(Booking.room_id.in_(room_ids)).order_by(Booking.id.desc()).limit(5).all()
    recent_bookings = []
    for b in recent_bookings_query:
        hotel_name = "Unknown"
        guest_name = "Unknown"
        room_name = "Unknown"
        
        if b.room:
            room_name = b.room.type
            if b.room.hotel:
                hotel_name = b.room.hotel.name
        
        if b.user:
            guest_name = b.user.full_name or b.user.email
            
        recent_bookings.append({
            "id": b.id,
            "guest": guest_name,
            "room": room_name,
            "checkIn": b.check_in,
            "checkOut": b.check_out,
            "status": b.status.capitalize() if b.status else "Confirmed"
        })

    return {
        "total_hotels": len(hotels),
        "total_rooms": total_rooms,
        "total_bookings": total_bookings,
        "revenue": revenue,
        "occupancy": f"{occupancy_rate}%",
        "recent_bookings": recent_bookings
    }

@router.get("/rooms", response_model=List[RoomSchema])
def get_manager_rooms(db: Session = Depends(get_db), current_user: User = Depends(get_current_manager)):
    hotels = db.query(Hotel).filter(Hotel.manager_id == current_user.id).all()
    hotel_ids = [h.id for h in hotels]
    return db.query(Room).filter(Room.hotel_id.in_(hotel_ids)).all()

@router.post("/rooms", response_model=RoomSchema)
def create_room(room: RoomCreate, hotel_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_manager)):
    # Verify manager owns the hotel
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id, Hotel.manager_id == current_user.id).first()
    if not hotel and current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=404, detail="Hotel not found or not authorized")
    
    db_room = Room(**room.model_dump(), hotel_id=hotel_id)
    db.add(db_room)
    db.commit()
    db.refresh(db_room)
    return db_room

@router.delete("/rooms/{room_id}")
def delete_room(room_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_manager)):
    room = db.query(Room).filter(Room.id == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    
    # Verify manager owns the hotel
    hotel = db.query(Hotel).filter(Hotel.id == room.hotel_id).first()
    if hotel.manager_id != current_user.id and current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized")

    db.delete(room)
    db.commit()
    return {"message": "Room deleted"}

@router.get("/hotels", response_model=List[HotelSchema])
def get_manager_hotels(db: Session = Depends(get_db), current_user: User = Depends(get_current_manager)):
    return db.query(Hotel).filter(Hotel.manager_id == current_user.id).all()

from app.schemas.hotel import RoomUpdate

@router.put("/rooms/{room_id}", response_model=RoomSchema)
def update_room(room_id: int, room_update: RoomUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_manager)):
    room = db.query(Room).filter(Room.id == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    
    # Verify manager owns the hotel
    hotel = db.query(Hotel).filter(Hotel.id == room.hotel_id).first()
    if hotel.manager_id != current_user.id and current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    update_data = room_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(room, key, value)
    
    db.commit()
    db.refresh(room)
    return room
