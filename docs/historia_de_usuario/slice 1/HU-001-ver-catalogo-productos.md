# Historia de Usuario: Ver Catálogo de Productos (HU-P1)

## Descripción
**Como** cliente del supermercado  
**Quiero** ver una lista de productos disponibles  
**Para** poder conocer qué productos puedo comprar y sus precios


## Criterios de Aceptación

### Criterios de Aceptación

1. Dado que soy un cliente
   Cuando ingreso al catálogo de productos
   Entonces veo una cuadrícula de productos con:
   - Imagen del producto
   - Nombre del producto
   - Precio según tipo de venta
   - Indicador de disponibilidad
   - Botón de agregar al carrito
   - Switch de tipo de venta (cuando aplique)

2. Dado que estoy viendo el catálogo
   Cuando lo visualizo en diferentes dispositivos
   Entonces la cuadrícula se ajusta responsivamente:
   - Desktop: 4 productos por fila
   - Tablet: 4 productos por fila
   - Mobile: 2 productos por fila

3. Dado que estoy viendo un producto por unidad
   Cuando miro su precio
   Entonces veo el precio por unidad claramente indicado

4. Dado que estoy viendo un producto por peso
   Cuando miro su precio
   Entonces veo el precio por kilo claramente indicado

5. Dado que estoy viendo un producto mixto
   Cuando miro su información
   Entonces:
   - Veo el precio por kilo
   - Veo un disclaimer sobre el precio final
   - Veo un switch para elegir tipo de venta

6. Dado que estoy explorando el catálogo
   Cuando uso los filtros de categoría
   Entonces:
   - Veo solo productos de la categoría seleccionada
   - Veo un breadcrumb de navegación por categorías
   - No veo productos inactivos

7. Dado que hay más de 20 productos
   Cuando navego por el catálogo
   Entonces:
   - Veo la paginación
   - Puedo navegar entre páginas
   - Solo se cargan 20 productos por página

8. Dado que estoy cargando el catálogo
   Cuando ingreso a la página
   Entonces:
   - La página carga en menos de 2 segundos
   - Las imágenes se cargan optimizadas
   - Las imágenes se cargan progresivamente (lazy loading)

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
     saleType: 'UNIDAD' | 'PESABLE' | 'MIXTO';
     unitPrice: number | null;     // Para display en productos mixtos
     weightPrice: number;          // Siempre requerido para productos pesables y mixtos
     requiresStock: boolean;       // Solo true para productos por unidad
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
