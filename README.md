# El Puesto - Documentación

## Descripción
MVP para el supermercado El Puesto. Este proyecto incluye una aplicación web con frontend en React (Vite) y backend en FastAPI.

## Estructura del Proyecto
```
PaginaWebElpuesto/
├── frontend/                 # React (Vite)
│   ├── src/
│   │   ├── assets/         # Imágenes, iconos, etc.
│   │   ├── components/     # Componentes reutilizables
│   │   │   ├── common/    # Botones, inputs, etc.
│   │   │   └── layout/    # Header, Footer, etc.
│   │   ├── pages/         # Páginas principales
│   │   ├── services/      # Servicios para llamadas a la API
│   │   └── App.jsx
│   └── package.json
│
├── backend/                 # FastAPI
│   ├── app/
│   │   ├── api/           # Endpoints de la API
│   │   ├── models/        # Modelos de datos
│   │   ├── config.py      # Configuración
│   │   └── main.py        # Aplicación principal
│   ├── requirements.txt
│   └── .env               # Variables de entorno
│
└── docs/                   # Documentación del proyecto
```

## Tecnologías Utilizadas
- Frontend: React con Vite
- Backend: FastAPI
- Base de datos: PostgreSQL

## Configuración Inicial
1. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **Backend**
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

3. **Base de datos**
   - Crear una base de datos PostgreSQL llamada 'elpuesto'
   - Configurar las variables de entorno en backend/.env