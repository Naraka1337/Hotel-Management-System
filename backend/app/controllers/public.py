from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from typing import List, Optional
from datetime import date
from app.core.database import get_db
from app.models.hotel import Hotel, Room
from app.models.booking import Booking
from app.models.user import User
from app.schemas.hotel import Hotel as HotelSchema, Room as RoomSchema
from app.schemas.booking import BookingCreate, Booking as BookingSchema
from app.controllers.auth import get_current_user

router = APIRouter()

@router.get("/hotels", response_model=List[HotelSchema])
def get_hotels(
    skip: int = 0, 
    limit: int = 100, 
    location: Optional[str] = Query(None, description="Filter hotels by location"),
    db: Session = Depends(get_db)
):
    query = db.query(Hotel)
    
    # Filter by location if provided (case-insensitive partial match)
    if location:
        query = query.filter(Hotel.location.ilike(f"%{location}%"))
    
    hotels = query.offset(skip).limit(limit).all()
    return hotels

@router.get("/hotels/{hotel_id}", response_model=HotelSchema)
def get_hotel(hotel_id: int, db: Session = Depends(get_db)):
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if hotel is None:
        raise HTTPException(status_code=404, detail="Hotel not found")
    return hotel

@router.get("/hotels/{hotel_id}/rooms", response_model=List[RoomSchema])
def get_hotel_rooms(hotel_id: int, db: Session = Depends(get_db)):
    rooms = db.query(Room).filter(Room.hotel_id == hotel_id).all()
    return rooms

# Helper function to check if a room is available for given dates
def is_room_available(db: Session, room_id: int, check_in: date, check_out: date) -> bool:
    """Check if a room is available for the given date range based on max_bookings limit."""
    # Get the room to check max_bookings
    room = db.query(Room).filter(Room.id == room_id).first()
    if not room:
        return False
    
    max_bookings = room.max_bookings or 1
    
    # Count overlapping confirmed bookings
    overlapping_count = db.query(Booking).filter(
        Booking.room_id == room_id,
        Booking.status == "confirmed",
        # Check for date overlap: booking overlaps if it starts before new ends AND ends after new starts
        Booking.check_in < check_out,
        Booking.check_out > check_in
    ).count()
    
    # Available if current bookings are less than max allowed
    return overlapping_count < max_bookings

@router.get("/rooms/{room_id}/availability")
def check_room_availability(
    room_id: int,
    check_in: date = Query(..., description="Check-in date"),
    check_out: date = Query(..., description="Check-out date"),
    db: Session = Depends(get_db)
):
    """Check if a specific room is available for the given dates."""
    # Verify room exists
    room = db.query(Room).filter(Room.id == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    
    if check_in >= check_out:
        raise HTTPException(status_code=400, detail="Check-out must be after check-in")
    
    available = is_room_available(db, room_id, check_in, check_out)
    
    return {
        "room_id": room_id,
        "check_in": check_in,
        "check_out": check_out,
        "is_available": available,
        "message": "Room is available" if available else "Room is already booked for these dates"
    }

@router.get("/hotels/{hotel_id}/available-rooms", response_model=List[RoomSchema])
def get_available_rooms(
    hotel_id: int,
    check_in: date = Query(..., description="Check-in date"),
    check_out: date = Query(..., description="Check-out date"),
    db: Session = Depends(get_db)
):
    """Get all available rooms for a hotel for the given date range."""
    # Verify hotel exists
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")
    
    if check_in >= check_out:
        raise HTTPException(status_code=400, detail="Check-out must be after check-in")
    
    # Get all rooms for the hotel
    all_rooms = db.query(Room).filter(Room.hotel_id == hotel_id).all()
    
    # Filter to only available rooms
    available_rooms = [
        room for room in all_rooms 
        if room.is_available and is_room_available(db, room.id, check_in, check_out)
    ]
    
    return available_rooms

@router.post("/bookings", response_model=BookingSchema)
def create_booking(booking: BookingCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Verify room exists
    room = db.query(Room).filter(Room.id == booking.room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    
    # Check if room is marked as available
    if not room.is_available:
        raise HTTPException(status_code=400, detail="Room is not available for booking")
    
    # Calculate total price
    days = (booking.check_out - booking.check_in).days
    if days <= 0:
        raise HTTPException(status_code=400, detail="Invalid dates")
    
    # Check if room is available for the requested dates
    if not is_room_available(db, booking.room_id, booking.check_in, booking.check_out):
        raise HTTPException(status_code=400, detail="Room is already booked for these dates")
    
    total_price = room.price * days
    
    db_booking = Booking(
        user_id=current_user.id,
        room_id=booking.room_id,
        check_in=booking.check_in,
        check_out=booking.check_out,
        total_price=total_price,
        status="confirmed"
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

@router.get("/bookings", response_model=List[BookingSchema])
def get_user_bookings(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    bookings = db.query(Booking).filter(Booking.user_id == current_user.id).all()
    return bookings

