# Historia de Usuario: Modificar Cantidades (HU-C3)

## Descripción
**Como** cliente del supermercado  
**Quiero** poder modificar la cantidad de cada producto en mi carrito  
**Para** ajustar mi compra según mis necesidades

## Criterios de Aceptación

1. Dado que estoy viendo un producto por unidad en mi carrito
   Cuando quiero modificar su cantidad
   Entonces:
   - Veo botones + y - para ajustar la cantidad
   - No puedo seleccionar menos de 1 unidad
   - No puedo exceder el stock disponible
   - El subtotal se actualiza automáticamente

2. Dado que estoy viendo un producto por peso en mi carrito
   Cuando quiero modificar su peso
   Entonces:
   - Veo botones + y - para ajustar el peso
   - Los incrementos/decrementos son de 100g
   - No puedo seleccionar menos de 100g
   - El subtotal se actualiza automáticamente

3. Dado que estoy viendo un producto mixto en mi carrito
   Cuando quiero modificar su cantidad
   Entonces:
   - Si está en modo unidad, veo botones + y - para ajustar unidades
   - Si está en modo peso, veo botones + y - para ajustar en incrementos de 100g
   - No hay validación de stock
   - El subtotal se actualiza automáticamente

4. Dado que modifico una cantidad
   Cuando el nuevo valor es inválido
   Entonces:
   - Veo un mensaje de error claro
   - La cantidad anterior se mantiene
   - El botón + se deshabilita si excedo el stock (productos por unidad)
   - El botón - se deshabilita si llego al mínimo

5. Dado que modifico una cantidad
   Cuando el nuevo valor es válido
   Entonces:
   - El total del carrito se actualiza inmediatamente
   - Los cambios se guardan automáticamente
   - Para usuarios no registrados, se actualiza en localStorage
   - Para usuarios registrados, se actualiza en la base de datos


## Detalles Técnicos

### Frontend (React + Vite)
1. Componentes Necesarios:
   ```typescript
   // Componentes
   QuantityEditor.jsx
   WeightEditor.jsx
   ErrorMessage.jsx
   UpdateIndicator.jsx
   
   // Hooks
   useCartItem.ts
   useQuantityValidation.ts
   useDebounce.ts
   ```

2. Interfaces:
   ```typescript
   interface UpdateQuantityParams {
     cartItemId: string;
     newQuantity?: number;
     newWeight?: number;
     saleType: 'UNIDAD' | 'PESABLE';
   }

   interface ValidationRules {
     minValue: number;           // 1 para unidades, 100 para peso
     maxValue?: number;          // undefined para productos sin stock
     increment: number;          // 1 para unidades, 100 para peso
     requiresStock: boolean;
   }

   interface UpdateResult {
     success: boolean;
     error?: string;
     newSubtotal: number;
     newTotal: number;
   }
   ```

### Backend (FastAPI)
1. Endpoints Necesarios:
   ```python
   # Actualizar cantidad/peso de item en carrito
   PATCH /api/cart/items/{item_id}
   Request: {
     quantity?: int,
     weight?: float,
     sale_type: Literal['UNIDAD', 'PESABLE']
   }
   Response: {
     success: bool,
     cart_item: CartItemWithProduct,
     cart_total: float,
     error?: str
   }
   ```

2. Modelos:
   ```python
   class UpdateCartItemRequest(BaseModel):
       quantity: Optional[int]
       weight: Optional[float]
       sale_type: Literal['UNIDAD', 'PESABLE']

   class CartUpdateResponse(BaseModel):
       success: bool
       cart_item: CartItemWithProduct
       cart_total: float
       error: Optional[str]
   ```

## Dependencias
- Historia de usuario HU-004 (Agregar al Carrito)
- Historia de usuario HU-005 (Ver Carrito)
- Sistema de validación de stock
- Sistema de persistencia del carrito
- Sistema de manejo de estado global para el carrito
