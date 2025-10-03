# Historia de Usuario: Ver Catálogo de Productos (HU-P1)

## Descripción
**Como** cliente del supermercado  
**Quiero** ver una lista de productos disponibles  
**Para** poder conocer qué productos puedo comprar y sus precios


## Criterios de Aceptación

### 1. Visualización de Productos
- La página debe mostrar una cuadrícula de productos
- Cada producto debe mostrar:
  - Imagen del producto
  - Nombre del producto
  - Precio (según tipo de venta)
  - Indicador de disponibilidad
  - Un boton para agregar al carrito
  - Un switch para elegir entre venta por unidad o por peso
- Los productos deben organizarse en una cuadrícula responsive
  - Desktop: 4 productos por fila
  - Tablet: 4 productos por fila
  - Mobile: 2 productos por fila

### 2. Precios y Tipos de Venta
- Para productos por unidad:
  - Mostrar precio por unidad
- Para productos por peso:
  - Mostrar precio por kilo
-  Para productos mixtos:
  - Mostrar ambos precios (unidad y kilo)
    - Permitir al usuario seleccionar el tipo de venta (unidad o peso) mediante un switch

### 3. Filtrado y Organización
- Los productos deben poder filtrarse por categoría
- Debe mostrar un menú/breadcrumb de navegación por categorías
- Los productos inactivos (`is_active = false`) no deben mostrarse
- Debe implementarse paginación (20 productos por página)

### 4. Rendimiento
- La página debe cargar en menos de 2 segundos
- Las imágenes deben estar optimizadas
- Debe implementarse lazy loading para imágenes
- La paginación debe ser eficiente y no recargar toda la página

## Detalles Técnicos

### Frontend (React + Vite)
1. Componentes Necesarios:
   ```typescript
   // Página principal
   ProductCatalog.tsx
   
   // Componentes
   ProductGrid.tsx
   ProductCard.tsx
   CategoryNavigation.tsx
   Pagination.tsx
   AddToCartButton.tsx
   ProductTypeSwitch.tsx
   PriceDisplay.tsx
   ```

2. Estado Global (Redux/Context):
   ```typescript
   interface Product {
     id: string;
     name: string;
     description: string;
     imageUrl: string;
     categoryId: string;
     isActive: boolean;
     saleType: 'UNIDAD' | 'PESABLE' | 'AMBOS';
     unitPrice: number | null;
     weightPrice: number | null;
   }

   interface ProductSaleType {
     productId: string;
     selectedType: 'UNIDAD' | 'PESABLE';
   }

   interface AddToCartAction {
     productId: string;
     saleType: 'UNIDAD' | 'PESABLE';
     quantity?: number;
     weight?: number;
   }

   interface Category {
     id: string;
     name: string;
     description: string;
     parentId: string | null;
   }
   ```

### Backend (FastAPI)
1. Endpoints Necesarios:
   ```python
   # Productos
   GET /api/products?page={page}&category={category_id}
   Response: {
     items: Product[],
     total: int,
     page: int,
     pages: int
   }

   # Agregar al Carrito
   POST /api/cart/items
   Request: AddToCartAction
   Response: {
     success: boolean,
     cartItemId: string
   }

   # Categorías
   GET /api/categories
   Response: Category[]
   ```

2. Queries SQL:
   ```sql
   -- Consulta base para productos
   SELECT 
     p.id,
     p.name,
     p.description,
     p.image_url,
     p.category_id,
     p.is_active,
     p.sale_type,
     p.unit_price,
     p.weight_price,
     c.name as category_name
   FROM products p
   JOIN categories c ON p.category_id = c.id
   WHERE p.is_active = true
   AND (:category_id IS NULL OR p.category_id = :category_id)
   ORDER BY p.name
   LIMIT :limit OFFSET :offset;
   ```

## Dependencias
- Base de datos configurada con tablas PRODUCTS y CATEGORIES
- Imágenes de productos disponibles y optimizadas
- Sistema de categorías implementado
