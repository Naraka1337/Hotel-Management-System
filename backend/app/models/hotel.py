from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.core.database import Base

class Hotel(Base):
    __tablename__ = "hotels"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String, index=True)
    description = Column(Text)
    image_url = Column(String, nullable=True)
    manager_id = Column(Integer, ForeignKey("users.id"))

    # Relationships
    manager = relationship("User", backref="managed_hotels")
    rooms = relationship("Room", back_populates="hotel", cascade="all, delete-orphan")

class Room(Base):
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True, index=True)
    hotel_id = Column(Integer, ForeignKey("hotels.id"))
    room_number = Column(String)
    type = Column(String) # Single, Double, Suite
    price = Column(Float)
    capacity = Column(Integer, default=1)
    is_available = Column(Boolean, default=True)
    description = Column(Text, nullable=True)

    # Relationships
    hotel = relationship("Hotel", back_populates="rooms")
