from pydantic import BaseModel
from datetime import date
from typing import Optional

class BookingBase(BaseModel):
    room_id: int
    check_in: date
    check_out: date

class BookingCreate(BookingBase):
    pass

class Booking(BookingBase):
    id: int
    user_id: int
    total_price: float
    status: str

    class Config:
        from_attributes = True
