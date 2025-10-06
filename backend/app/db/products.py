# Operaciones de base de datos para productos
# Implementa las operaciones CRUD usando SQLAlchemy

from typing import Dict, Optional
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..models.product import ProductDB, Product
from ..models.category import CategoryDB

def get_products(
    db: Session,
    page: int = 1,
    items_per_page: int = 20,
    category_id: Optional[str] = None
) -> Dict:
    """
    Obtiene una lista paginada de productos, opcionalmente filtrada por categoría.
    
    Args:
        db: Sesión de SQLAlchemy
        page: Número de página
        items_per_page: Productos por página
        category_id: ID opcional de categoría para filtrar
    
    Returns:
        Dict con items (productos), total, página actual y total de páginas
    """
    # Calcular el offset para la paginación
    offset = (page - 1) * items_per_page
    
    # Query base
    query = db.query(ProductDB).join(CategoryDB)
    
    # Aplicar filtros
    query = query.filter(ProductDB.is_active == True)
    if category_id:
        query = query.filter(ProductDB.category_id == category_id)
    
    # Contar total de items para paginación
    total_items = query.count()
    
    # Obtener productos de la página actual
    products = (query
               .order_by(ProductDB.name)
               .offset(offset)
               .limit(items_per_page)
               .all())
    
    # Calcular total de páginas
    total_pages = (total_items + items_per_page - 1) // items_per_page
    
    # Convertir a diccionario con información adicional
    return {
        'items': [
            {
                **Product.from_orm(product).__dict__,
                'category_name': product.category.name
            }
            for product in products
        ],
        'total': total_items,
        'page': page,
        'pages': total_pages
    }