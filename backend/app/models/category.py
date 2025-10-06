# Modelos de datos para las categorías
# Define tanto el modelo SQLAlchemy como el esquema Pydantic

from uuid import uuid4
from typing import List, Optional
from sqlalchemy import Column, String, Text, ForeignKey, UUID
from sqlalchemy.orm import relationship
from pydantic import BaseModel
from ..config import Base

# Modelo SQLAlchemy para la base de datos
class CategoryDB(Base):
    """Modelo SQLAlchemy para la tabla categories"""
    __tablename__ = "categories"

    id = Column(UUID, primary_key=True, default=uuid4)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    parent_id = Column(UUID, ForeignKey('categories.id'), nullable=True)

    # Relaciones
    children = relationship("CategoryDB", 
                          backref="parent",
                          remote_side=[id],
                          cascade="all, delete-orphan")
    products = relationship("ProductDB", back_populates="category")

# Esquema Pydantic para la API
class CategoryBase(BaseModel):
    """Esquema base para categorías"""
    name: str
    description: str
    parent_id: Optional[UUID] = None

class CategoryCreate(CategoryBase):
    """Esquema para crear categorías"""
    pass

class Category(CategoryBase):
    """Esquema para respuestas de la API"""
    id: UUID
    children: List['Category'] = []

    class Config:
        orm_mode = True

# Necesario para la referencia circular en children
Category.update_forward_refs()