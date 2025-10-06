# Modelos de datos para los productos
# Define tanto el modelo SQLAlchemy como el esquema Pydantic

from uuid import uuid4
from enum import Enum
from decimal import Decimal
from typing import Optional
from sqlalchemy import Column, String, Text, Boolean, Enum as SQLEnum, UUID, ForeignKey, Integer, Numeric
from sqlalchemy.orm import relationship
from pydantic import BaseModel, Field
from ..config import Base

class SaleType(str, Enum):
    """Tipo de venta de un producto"""
    UNIDAD = "UNIDAD"
    PESABLE = "PESABLE"
    MIXTO = "MIXTO"

# Modelo SQLAlchemy para la base de datos
class ProductDB(Base):
    """Modelo SQLAlchemy para la tabla products"""
    __tablename__ = "products"

    id = Column(UUID, primary_key=True, default=uuid4)
    name = Column(String(255), nullable=False, index=True)
    description = Column(Text)
    image_url = Column(String(255))
    category_id = Column(UUID, ForeignKey('categories.id'), nullable=False, index=True)
    is_active = Column(Boolean, default=True)
    sale_type = Column(SQLEnum(SaleType), nullable=False)
    unit_price = Column(Numeric(10, 2), nullable=True)
    weight_price = Column(Numeric(10, 2), nullable=True)
    stock_units = Column(Integer, nullable=True)
    requires_stock = Column(Boolean, default=False)

    # Relaciones
    category = relationship("CategoryDB", back_populates="products")

    def __repr__(self):
        return f"<Product {self.name}>"

# Esquemas Pydantic para la API
class ProductBase(BaseModel):
    """Esquema base para productos"""
    name: str = Field(..., min_length=1, max_length=255)
    description: str
    image_url: str
    category_id: UUID
    is_active: bool = True
    sale_type: SaleType
    unit_price: Optional[Decimal] = None
    weight_price: Optional[Decimal] = None
    stock_units: Optional[int] = None
    requires_stock: bool = False

class ProductCreate(ProductBase):
    """Esquema para crear productos"""
    pass

class Product(ProductBase):
    """Esquema para respuestas de la API"""
    id: UUID
    category_name: Optional[str] = None

    class Config:
        orm_mode = True
