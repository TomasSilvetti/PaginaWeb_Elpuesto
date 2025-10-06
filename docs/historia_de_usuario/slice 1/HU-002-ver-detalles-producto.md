# Historia de Usuario: Ver Detalles de Producto (HU-002)

## Descripción
**Como** cliente del supermercado  
**Quiero** ver los detalles completos de un producto  
**Para** poder conocer su descripción, precio y disponibilidad

## Criterios de Aceptación

### Criterios de Aceptación

1. Dado que soy un cliente
   Cuando ingreso a los detalles de un producto
   Entonces veo:
   - Imagen grande del producto
   - Nombre del producto
   - Descripción detallada
   - Categoría con navegación en breadcrumb
   - Precio según tipo de venta
   - Indicador de disponibilidad
   - Botón de agregar al carrito

2. Dado que estoy viendo un producto por unidad
   Cuando quiero agregarlo al carrito
   Entonces:
   - Veo el precio por unidad
   - Puedo seleccionar la cantidad
   - Veo una validación si excedo el stock

3. Dado que estoy viendo un producto por peso
   Cuando quiero agregarlo al carrito
   Entonces:
   - Veo el precio por kilo
   - Puedo ingresar el peso en gramos
   - El peso se incrementa en 100g
   - No puedo ingresar menos del peso mínimo (100g)
   - Veo el precio calculado según el peso

4. Dado que estoy viendo un producto mixto
   Cuando quiero agregarlo al carrito
   Entonces:
   - Veo el precio por kilo
   - Veo un disclaimer sobre el precio final
   - Puedo alternar entre unidad y peso
   - Veo el input correspondiente al modo seleccionado
   - No veo validaciones de stock

5. Dado que estoy en la página de detalles
   Cuando interactúo con la página
   Entonces:
   - La página carga en menos de 1 segundo
   - Las imágenes están optimizadas y precargadas
   - Recibo feedback inmediato al cambiar cantidades
   - Las transiciones son suaves

## Detalles Técnicos

### Frontend (React + Vite)
1. Componentes Necesarios:
   ```javascript
   // Página principal
   ProductDetail.jsx

   // Componentes
   ProductImage.jsx
   ProductInfo.jsx
   AddToCartForm.jsx
   WeightSelector.jsx  // Componente específico para selección de peso
   PriceDisplay.jsx    // Componente para mostrar precios y disclaimers
   ProductTypeSwitch.jsx // Switch para alternar entre unidad/peso
   ```

2. Estado Global (Redux/Context):
   ```javascript
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
       WHEN p.sale_type IN ('PESABLE', 'MIXTO') THEN 100 -- peso mínimo en gramos
       ELSE NULL 
     END as min_weight,
     CASE 
       WHEN p.sale_type IN ('PESABLE', 'MIXTO') THEN 100 -- incremento en gramos
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