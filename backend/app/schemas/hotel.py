from pydantic import BaseModel
from typing import List, Optional

# --- Room Schemas ---
class RoomBase(BaseModel):
    room_number: str
    type: str
    price: float
    description: Optional[str] = None
    is_available: bool = True

class RoomCreate(RoomBase):
    pass

class RoomUpdate(BaseModel):
    room_number: Optional[str] = None
    type: Optional[str] = None
    price: Optional[float] = None
    description: Optional[str] = None
    is_available: Optional[bool] = None

class Room(RoomBase):
    id: int
    hotel_id: int

    class Config:
        from_attributes = True

# --- Hotel Schemas ---
class HotelBase(BaseModel):
    name: str
    location: str
    description: Optional[str] = None
    image_url: Optional[str] = None

class HotelCreate(HotelBase):
    manager_id: int

class Hotel(HotelBase):
    id: int
    manager_id: int
    rooms: List[Room] = []

    class Config:
        from_attributes = True

    @property
    def price_per_night(self) -> float:
        if not self.rooms:
            return 0.0
        return min(room.price for room in self.rooms)

    @property
    def city(self) -> str:
        return self.location

    @property
    def rating(self) -> float:
        return 4.5
