# Historia de Usuario: Ver Detalles de Producto (HU-002)

## Descripción
**Como** cliente del supermercado  
**Quiero** ver los detalles completos de un producto  
**Para** poder conocer su descripción, precio y disponibilidad

## Criterios de Aceptación

### 1. Visualización de Información
- La página debe mostrar:
  - Imagen grande del producto
  - Nombre del producto
  - Descripción detallada
  - Categoría y navegación en breadcrumb
  - Precio según tipo de venta
  - Indicador de disponibilidad/stock
  - Botón para agregar al carrito

### 2. Precios y Tipos de Venta
- Para productos por unidad:
  - Mostrar precio por unidad
  - Input numérico para seleccionar cantidad
  - Validación de stock disponible
  
- Para productos por peso:
  - Mostrar precio por kilo
  - Input numérico para ingresar peso en gramos en incrementos de a 100g (minimo 100g)
  - Mostrar precio calculado según peso ingresado
  - Validación de peso mínimo de venta
  
- Para productos mixtos:
  - Switch para alternar entre venta por unidad o peso
  - Mostrar precio por kilo y un disclaimer de que el precio final depende del peso
  - Inputs correspondientes según modo seleccionado
  - Validaciones específicas según modo

### 3. Rendimiento y UX
- La página debe cargar en menos de 1 segundo
- Las imágenes deben estar optimizadas
- Implementar preload de imágenes
- Feedback inmediato al cambiar cantidades/pesos
- Animaciones suaves en transiciones

## Detalles Técnicos

### Frontend (React + Vite)
1. Componentes Necesarios:
   ```typescript
   // Página principal
   ProductDetail.tsx
   
   // Componentes
   ProductImage.tsx
   ProductInfo.tsx
   AddToCartForm.tsx
   WeightSelector.tsx  // Componente específico para selección de peso
   PriceDisplay.tsx    // Componente para mostrar precios y disclaimers
   ProductTypeSwitch.tsx // Switch para alternar entre unidad/peso
   ```

2. Estado Global (Redux/Context):
   ```typescript
   interface ProductDetail extends Product {
     category: Category;
     relatedProducts: Product[];
   }

   interface AddToCartData {
     productId: string;
     quantity?: number;
     weight?: number; // en gramos, múltiplos de 100
     saleType: 'UNIDAD' | 'PESABLE';
     unitPrice?: number;
     weightPrice?: number;
   }

   interface WeightValidation {
     minWeight: number; // 100 gramos
     increment: number; // 100 gramos
     isValidWeight: (weight: number) => boolean;
     formatWeight: (weight: number) => string;
     calculatePrice: (weight: number, pricePerKilo: number) => number;
   }
   ```

### Backend (FastAPI)
1. Endpoints Necesarios:
   ```python
   # Detalle de Producto
   GET /api/products/{product_id}
   Response: {
     ...ProductDetail,
     weightConfig: {
       minWeight: number,    # 100g por defecto
       increment: number,    # 100g por defecto
       maxWeight?: number    # opcional, para algunos productos
     }
   }
   ```

2. Queries SQL:
   ```sql
   -- Consulta detalle de producto
   SELECT 
     p.*,
     c.name as category_name,
     c.description as category_description,
     CASE 
       WHEN p.sale_type IN ('PESABLE', 'AMBOS') THEN 100 -- peso mínimo en gramos
       ELSE NULL 
     END as min_weight,
     CASE 
       WHEN p.sale_type IN ('PESABLE', 'AMBOS') THEN 100 -- incremento en gramos
       ELSE NULL 
     END as weight_increment
   FROM products p
   JOIN categories c ON p.category_id = c.id
   WHERE p.id = :product_id
   AND p.is_active = true;
   ```

## Dependencias
- Historia de usuario HU-001 (Ver Catálogo de Productos)
- Base de datos configurada con tablas PRODUCTS y CATEGORIES
- Imágenes de productos en alta resolución disponibles
- Sistema de carrito implementado para la funcionalidad de agregar al carrito