import os
from dotenv import load_dotenv

load_dotenv()

# Configuración de la base de datos
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/elpuesto")

# Otras configuraciones
API_VERSION = "v1"
PROJECT_NAME = "El Puesto API"