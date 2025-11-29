from sqlalchemy import Boolean, Column, Integer, String, Enum
from app.core.database import Base
import enum

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    MANAGER = "manager"
    GUEST = "guest"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    role = Column(String, default=UserRole.GUEST)
    is_active = Column(Boolean, default=True)
