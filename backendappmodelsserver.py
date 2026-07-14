from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float, JSON
from sqlalchemy.sql import func
from ..core.database import Base

class Server(Base):
    __tablename__ = "servers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    ip_address = Column(String(45), nullable=False)
    port = Column(Integer, default=51820)
    protocol = Column(String(20), default="wireguard")  # wireguard, openvpn, shadowsocks
    status = Column(String(20), default="active")  # active, inactive, error
    location = Column(String(100))
    bandwidth_used = Column(Float, default=0.0)  # GB
    max_connections = Column(Integer, default=100)
    current_connections = Column(Integer, default=0)
    config_data = Column(JSON, default={})  # تنظیمات خاص هر پروتکل
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())