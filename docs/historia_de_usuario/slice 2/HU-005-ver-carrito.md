# Historia de Usuario: Ver Carrito (HU-C2)

## Descripción
**Como** cliente del supermercado  
**Quiero** ver el contenido de mi carrito de compras  
**Para** revisar los productos que he seleccionado y el total a pagar

## Criterios de Aceptación

1. Dado que soy un cliente
   Cuando accedo a mi carrito
   Entonces veo:
   - Un listado de todos los productos agregados
   - Un botón para ir al checkout
   - Un botón para seguir comprando
   - El total acumulado de la compra

2. Dado que tengo productos en el carrito
   Cuando reviso cada ítem
   Entonces veo:
   - Imagen del producto
   - Nombre del producto
   - Cantidad o peso seleccionado
   - Precio unitario o por kilo
   - Subtotal del ítem
   - Para productos mixtos, mostrar el peso por kilo y un aviso de precio referencial

3. Dado que tengo productos por unidad
   Cuando reviso su información
   Entonces:
   - Veo la cantidad seleccionada en unidades
   - Veo el subtotal calculado (cantidad × precio unitario)

4. Dado que tengo productos por peso
   Cuando reviso su información
   Entonces:
   - Veo el peso seleccionado en gramos
   - Veo el subtotal calculado (peso × precio por kilo)

5. Dado que tengo productos mixtos
   Cuando reviso su información
   Entonces:
   - Veo el tipo de venta seleccionado (unidad o peso)
   - Si elegí por unidad, veo la cantidad de unidades
   - Si elegí por peso, veo el peso en gramos
   - Veo un mensaje claro indicando que el precio es referencial
   - Veo el precio por kilo

6. Dado que el carrito está vacío
   Cuando lo visito
   Entonces:
   - Veo un mensaje indicando que no hay productos
   - Veo un botón destacado para ir al catálogo
   - No veo el botón de checkout

7. Dado que no estoy registrado
   Cuando visito el carrito
   Entonces:
   - Veo los productos guardados en localStorage
   - Veo un mensaje sugiriendo registrarme
   - El carrito persiste entre recargas

8. Dado que estoy viendo el carrito
   Cuando hay productos pesables o mixtos
   Entonces veo un aviso destacado indicando que los precios son referenciales y que el precio final podrá ser diferente al momento de pagar

## Detalles Técnicos

### Frontend (React + Vite)
1. Componentes Necesarios:
   ```typescript
   // Páginas
   CartPage.tsx
   
   // Componentes
   CartItemList.tsx
   CartItem.tsx
   CartSummary.tsx
   EmptyCart.tsx
   PriceDisplay.tsx
   PriceWarning.tsx           // Componente para mostrar advertencias de precio
   WeightPriceDisplay.tsx     // Componente específico para mostrar precios por peso
   CheckoutButton.tsx
   ContinueShoppingButton.tsx
   LoginSuggestion.tsx
   
   // Hooks
   useCart.ts
   useCartTotal.ts
   ```

2. Interfaces:
   ```typescript
   interface CartSummary {
     subtotal: number;
     itemCount: number;
     hasEstimatedPrices: boolean;
     weightBasedItems: number;
     unitBasedItems: number;
   }

   interface CartItemDisplay {
     id: string;
     product: Product;
     quantity?: number;
     weight?: number;
     saleType: 'UNIDAD' | 'PESABLE';
     subtotal: number;
     isEstimatedPrice: boolean;
     displayMeasure: string;  // "2 unidades" o "500 gramos"
     weightPrice: number;     // Precio por kilo para productos pesables y mixtos
     finalPriceWarning: string; // Mensaje de advertencia sobre precio final
   }
   ```

### Backend (FastAPI)
1. Endpoints Necesarios:
   ```python
   # Obtener carrito actual
   GET /api/cart
   Response: {
     items: CartItem[],
     total: float,
     item_count: int,
     has_estimated_prices: bool
   }

   # Obtener detalles de productos en carrito
   GET /api/cart/details
   Response: {
     items: CartItemWithProduct[],
     summary: CartSummary
   }
   ```

2. Modelos:
   ```python
   class CartSummary(BaseModel):
       subtotal: float
       item_count: int
       has_estimated_prices: bool
       weight_based_items: int
       unit_based_items: int

   class CartItemWithProduct(BaseModel):
       id: str
       product: Product
       quantity: Optional[int]          # Solo para productos por unidad o mixtos en modo unidad
       weight: Optional[float]          # Para productos por peso y mixtos
       sale_type: Literal['UNIDAD', 'PESABLE']
       weight_price_at_time: float      # Precio por kilo (requerido para productos por peso y mixtos)
       is_price_estimated: bool         # True para productos mixtos
       final_price_warning: str         # Mensaje de advertencia sobre precio final
       created_at: datetime
   ```

## Dependencias
- Historia de usuario HU-004 (Agregar al Carrito)
- Sistema de autenticación para usuarios registrados
- Base de datos con tablas CART y CART_ITEMS
- Sistema de manejo de estado global para el carrito