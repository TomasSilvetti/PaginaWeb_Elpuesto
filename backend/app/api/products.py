from fastapi import APIRouter, Query, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Optional
from ..db.products import get_products
from ..models.product import Product
from ..config import ITEMS_PER_PAGE, get_db

router = APIRouter(prefix="/api/products", tags=["products"])

@router.get("")
async def list_products(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1, description="Número de página"),
    category_id: Optional[str] = Query(None, description="ID de la categoría para filtrar")
):
    """
    Obtener lista paginada de productos.
    Opcionalmente filtrada por categoría.
    
    Args:
        db: Sesión de base de datos (inyectada por FastAPI)
        page: Número de página a mostrar
        category_id: ID opcional de categoría para filtrar
    
    Returns:
        Dict con items (productos), total, página actual y total de páginas
    """
    try:
        return get_products(
            db=db,
            page=page,
            items_per_page=ITEMS_PER_PAGE,
            category_id=category_id
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error al obtener productos: {str(e)}"
        )