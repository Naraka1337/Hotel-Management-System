from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.hotel import Hotel, Room
from app.models.booking import Booking
from app.models.user import User
from app.schemas.hotel import Hotel as HotelSchema, Room as RoomSchema
from app.schemas.booking import BookingCreate, Booking as BookingSchema
from app.controllers.auth import get_current_user

router = APIRouter()

@router.get("/hotels", response_model=List[HotelSchema])
def get_hotels(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    hotels = db.query(Hotel).offset(skip).limit(limit).all()
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

@router.post("/bookings", response_model=BookingSchema)
def create_booking(booking: BookingCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Verify room exists
    room = db.query(Room).filter(Room.id == booking.room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    
    # Calculate total price
    days = (booking.check_out - booking.check_in).days
    if days <= 0:
        raise HTTPException(status_code=400, detail="Invalid dates")
    
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
