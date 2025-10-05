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

## Diagrama de Clases

```mermaid
erDiagram
    USERS {
        UUID id PK
        string email UK
        string password_hash
        string first_name
        string last_name
        string phone
        timestamp created_at
        boolean is_active
    }

    CATEGORIES {
        UUID id PK
        string name
        text description
        UUID parent_id FK "Self-referential"
    }

    PRODUCTS {
        UUID id PK
        string name
        text description
        string image_url
        UUID category_id FK
        boolean is_active
        enum sale_type "UNIDAD|PESABLE|MIXTO"
        decimal unit_price "Precio por unidad"
        decimal weight_price "Precio por kilo"
        integer stock_units "Stock en unidades, NULL para productos solo pesables"
        boolean requires_stock "True para productos que requieren control de stock"
    }

    CARTS {
        UUID id PK
        UUID user_id FK
    }

    CART_ITEMS {
        UUID id PK
        UUID cart_id FK
        UUID product_id FK
        integer quantity "Cantidad en unidades"
        integer weight "Peso en gramos"
        decimal unit_price_at_time "Precio por unidad al momento"
        decimal weight_price_at_time "Precio por kilo al momento"
        enum sale_type_selected "UNIDAD|PESABLE|AMBOS"
        timestamp created_at
    }

    ORDERS {
        UUID id PK
        UUID user_id FK
        string status "PENDIENTE|ENTREGADO|CANCELADO"
        decimal total_amount
        decimal subtotal
        decimal shipping_cost
        string shipping_address
        string city
        string postal_code
        string phone_number
        string notes
        string shipping_method
        string payment_method
        string bank_card "banco a la que pertenece la tarjeta"
        datetime created_at
        datetime expected_delivery_date
    }

    ORDER_ITEMS {
        UUID id PK
        UUID order_id FK
        UUID product_id FK
        integer quantity "Cantidad en unidades"
        integer weight "Peso en gramos"
        decimal unit_price_at_time "Precio por unidad al momento"
        decimal weight_price_at_time "Precio por kilo al momento"
        enum sale_type_selected "UNIDAD|PESABLE|AMBOS"
    }

    USERS ||--o{ CARTS : "tiene"
    USERS ||--o{ ORDERS : "realiza"
    
    CATEGORIES ||--o{ PRODUCTS : "contiene"
    CATEGORIES ||--o{ CATEGORIES : "es padre de"
    
    PRODUCTS ||--o{ CART_ITEMS : "está en"
    PRODUCTS ||--o{ ORDER_ITEMS : "está en"
    
    CARTS ||--|{ CART_ITEMS : "contiene"
    ORDERS ||--|{ ORDER_ITEMS : "contiene"
```