# Operaciones de base de datos para categorías
# Maneja todas las consultas relacionadas con categorías

# Operaciones de base de datos para categorías
# Implementa las operaciones CRUD usando SQLAlchemy

from typing import List, Dict, Optional
from sqlalchemy.orm import Session, joinedload
from ..models.category import CategoryDB, Category

def get_all_categories(db: Session) -> List[Dict]:
    """
    Obtiene todas las categorías y construye un árbol jerárquico.
    Las categorías principales (sin padre) estarán en el nivel superior,
    y sus subcategorías estarán en la lista 'children'.

    Args:
        db: Sesión de SQLAlchemy

    Returns:
        Lista de categorías en formato jerárquico
    """
    # Obtener todas las categorías con sus relaciones precargadas
    categories = (
        db.query(CategoryDB)
        .options(joinedload(CategoryDB.children))
        .all()
    )

    # Convertir a diccionario para fácil acceso
    categories_dict = {}
    
    def category_to_dict(cat: CategoryDB) -> Dict:
        """Convierte una categoría y sus hijos en un diccionario"""
        return {
            'id': cat.id,
            'name': cat.name,
            'description': cat.description,
            'parent_id': cat.parent_id,
            'children': [category_to_dict(child) for child in cat.children]
        }

    # Construir el árbol de categorías
    root_categories = []
    for cat in categories:
        if cat.parent_id is None:
            # Es una categoría principal
            root_categories.append(category_to_dict(cat))

    return root_categories

def get_category(db: Session, category_id: str) -> Optional[CategoryDB]:
    """
    Obtiene una categoría específica por su ID.

    Args:
        db: Sesión de SQLAlchemy
        category_id: ID de la categoría a buscar

    Returns:
        Categoría encontrada o None si no existe
    """
    return (
        db.query(CategoryDB)
        .filter(CategoryDB.id == category_id)
        .first()
    )