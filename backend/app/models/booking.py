from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date
from sqlalchemy.orm import relationship
from app.core.database import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    room_id = Column(Integer, ForeignKey("rooms.id"))
    check_in = Column(Date)
    check_out = Column(Date)
    total_price = Column(Float)
    status = Column(String, default="confirmed") # confirmed, cancelled

    # Relationships
    user = relationship("User", backref="bookings")
    room = relationship("Room", backref="bookings")
