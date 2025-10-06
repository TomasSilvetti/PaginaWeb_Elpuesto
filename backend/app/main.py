# Archivo principal de la aplicación FastAPI
# Configura la aplicación, middleware CORS y registra las rutas

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import products, categories  # Importar los routers

# Crear la instancia principal de la aplicación
app = FastAPI(
    title="El Puesto API",
    description="API para el supermercado El Puesto",
    version="1.0.0"
)

# Configuración de CORS para permitir peticiones desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Origen del frontend de Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar los routers
app.include_router(products.router)   # Rutas de productos
app.include_router(categories.router) # Rutas de categorías

# Ruta de health check para verificar que la API está funcionando
@app.get("/")
async def root():
    """Endpoint de verificación de estado de la API"""
    return {
        "status": "online",
        "service": "El Puesto API",
        "version": "1.0.0"
    }