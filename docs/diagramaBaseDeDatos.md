# Diagrama de Base de Datos - El Puesto

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
        enum sale_type "UNIDAD|PESABLE|AMBOS"
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

## Detalles de Implementación

### Tipos de Datos
- UUID: Identificadores únicos universales (v4)
- string: VARCHAR(255)
- text: TEXT
- decimal: DECIMAL(10,2) para precios
- integer: INTEGER
- timestamp: TIMESTAMP WITH TIME ZONE
- boolean: BOOLEAN
- enum: ENUM type para estados específicos

### Índices Recomendados
1. USERS:
   - email (UNIQUE)
   - created_at

2. PRODUCTS:
   - category_id
   - name (para búsquedas)
   - created_at

3. CARTS:
   - user_id

4. ORDERS:
   - user_id
   - status
   - created_at

5. CART_ITEMS & ORDER_ITEMS:
   - product_id
   - cart_id/order_id

### Restricciones
1. Productos:
   - price > 0
   - stock >= 0
   - category_id NOT NULL

2. Cart Items:
   - quantity > 0
   - price_at_time > 0

3. Order Items:
   - quantity > 0
   - price_at_time > 0

4. Orders:
   - total_amount >= 0

### Triggers Necesarios
1. Actualizar total_amount en ORDERS cuando se modifican ORDER_ITEMS
2. Verificar stock antes de crear ORDER_ITEMS
3. Actualizar stock cuando una orden es completada
4. Cancelar órdenes PENDING expiradas

### Consideraciones de Seguridad
1. Encriptación para datos sensibles
2. Soft delete para registros importantes
3. Auditoría de cambios en órdenes
4. Validación de estados de orden
5. Control de concurrencia para stock