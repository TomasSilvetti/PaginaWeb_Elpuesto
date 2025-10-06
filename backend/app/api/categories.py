# Router para los endpoints de categorías
# Maneja todas las rutas relacionadas con categorías de productos

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from ..db.categories import get_all_categories, get_category
from ..models.category import Category
from ..config import get_db

# Crear el router con un prefijo y etiqueta para la documentación
router = APIRouter(
    prefix="/api/categories",
    tags=["categories"]
)

@router.get("")
async def list_categories(
    db: Session = Depends(get_db)
):
    """
    Obtiene todas las categorías organizadas jerárquicamente.
    Las categorías principales contienen sus subcategorías en el campo 'children'.

    Args:
        db: Sesión de base de datos (inyectada por FastAPI)

    Returns:
        Lista jerárquica de categorías
    """
    try:
        return get_all_categories(db)
    except Exception as e:
        # Log del error aquí si es necesario
        raise HTTPException(
            status_code=500,
            detail=f"Error al obtener las categorías: {str(e)}"
        )

@router.get("/{category_id}")
async def get_category_by_id(
    category_id: str,
    db: Session = Depends(get_db)
):
    """
    Obtiene una categoría específica por su ID.

    Args:
        category_id: ID de la categoría a buscar
        db: Sesión de base de datos (inyectada por FastAPI)

    Returns:
        Detalles de la categoría
    """
    category = get_category(db, category_id)
    if not category:
        raise HTTPException(
            status_code=404,
            detail=f"Categoría {category_id} no encontrada"
        )
    return Category.from_orm(category)