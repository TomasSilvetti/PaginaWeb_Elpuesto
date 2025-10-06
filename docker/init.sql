-- Habilitar la extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear tipo enum para sale_type
CREATE TYPE sale_type AS ENUM ('UNIDAD', 'PESABLE', 'MIXTO');

-- Crear tabla de categorías
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES categories(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear índice para búsqueda por nombre de categoría
CREATE INDEX idx_categories_name ON categories(name);
CREATE INDEX idx_categories_parent ON categories(parent_id);

-- Crear tabla de productos
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    category_id UUID NOT NULL REFERENCES categories(id),
    is_active BOOLEAN DEFAULT true,
    sale_type sale_type NOT NULL,
    unit_price DECIMAL(10,2),
    weight_price DECIMAL(10,2),
    stock_units INTEGER,
    requires_stock BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para productos
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_active ON products(is_active);

-- Agregar restricciones de validación
ALTER TABLE products
    ADD CONSTRAINT check_prices 
    CHECK (
        (sale_type = 'UNIDAD' AND unit_price IS NOT NULL AND unit_price > 0) OR
        (sale_type = 'PESABLE' AND weight_price IS NOT NULL AND weight_price > 0) OR
        (sale_type = 'MIXTO' AND unit_price IS NOT NULL AND weight_price IS NOT NULL AND unit_price > 0 AND weight_price > 0)
    );

ALTER TABLE products
    ADD CONSTRAINT check_stock
    CHECK (
        (requires_stock = false AND stock_units IS NULL) OR
        (requires_stock = true AND stock_units >= 0)
    );

-- Insertar algunas categorías de ejemplo
INSERT INTO categories (name, description) VALUES
    ('Frutas y Verduras', 'Productos frescos del día'),
    ('Carnes', 'Carnes frescas y embutidos'),
    ('Bebidas', 'Bebidas con y sin alcohol'),
    ('Limpieza', 'Productos de limpieza para el hogar');

-- Insertar algunos productos de ejemplo
INSERT INTO products (name, description, category_id, sale_type, unit_price, weight_price, requires_stock, stock_units)
SELECT 
    'Manzanas',
    'Manzanas frescas',
    id,
    'MIXTO',
    50.00,
    800.00,
    false,
    null
FROM categories WHERE name = 'Frutas y Verduras';