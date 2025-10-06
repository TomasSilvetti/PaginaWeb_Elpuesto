# Configuración principal de la aplicación
# Define variables de entorno y configuraciones de base de datos

import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.ext.declarative import DeclarativeMeta

# Cargar variables de entorno
load_dotenv()

# Configuración de la base de datos
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/elpuesto")

# Crear el motor de SQLAlchemy
engine = create_engine(DATABASE_URL)

# Crear el fabricante de sesiones
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Crear la clase base para los modelos
Base: DeclarativeMeta = declarative_base()

# Configuración de la aplicación
API_VERSION = "v1"
PROJECT_NAME = "El Puesto API"
ITEMS_PER_PAGE = 20

# Función para obtener la sesión de BD
def get_db():
    """
    Genera un generador de sesión de base de datos.
    Para usar con FastAPI como una dependencia.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()