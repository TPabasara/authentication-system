from .routers.database.database import Base
from sqlalchemy import Column, DateTime, Integer, String, ForeignKey

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

class Otp(Base):
    __tablename__ = "otp"
    id = Column(Integer, primary_key=True, autoincrement=True)
    otp = Column(String, nullable=False, unique=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"),nullable=False)
    expire_at = Column(DateTime(timezone=True), nullable=False)