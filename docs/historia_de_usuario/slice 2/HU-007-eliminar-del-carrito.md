# Historia de Usuario: Eliminar del Carrito (HU-C4)

## Descripción
**Como** cliente del supermercado  
**Quiero** poder eliminar productos de mi carrito  
**Para** no comprar productos que ya no deseo

## Criterios de Aceptación

1. Dado que estoy viendo un producto en mi carrito
   Cuando quiero eliminarlo
   Entonces:
   - Veo un botón de eliminar (X) claramente visible

2. Dado que confirmo eliminar un producto
   Cuando hago clic en "Eliminar"
   Entonces:
   - El producto se elimina del carrito
   - El total se actualiza automáticamente
   - Para usuarios no registrados, se actualiza localStorage
   - Para usuarios registrados, se actualiza la base de datos

3. Dado que elimino un producto
   Cuando la operación es exitosa
   Entonces:
   - El carrito refleja el cambio inmediatamente

5. Dado que el carrito queda vacío
   Cuando elimino el último producto
   Entonces:
   - Veo un mensaje indicando que el carrito está vacío
   - Veo un botón para volver al catálogo
   - No veo el botón de checkout

## Detalles Técnicos

### Frontend (React + Vite)
1. Componentes Necesarios:
   ```typescript
   // Componentes
   DeleteItemButton.jsx
   EmptyCartMessage.jsx
   
   // Hooks
   useCart.ts
   ```

2. Interfaces:
   ```typescript
   interface DeleteItemParams {
     cartItemId: string;
   }

   interface DeleteResult {
     success: boolean;
     newTotal: number;
     error?: string;
   }
   ```

### Backend (FastAPI)
1. Endpoints Necesarios:
   ```python
   # Eliminar item del carrito
   DELETE /api/cart/items/{item_id}
   Response: {
     success: bool,
     cart_total: float,
     error?: str
   }
   ```

2. Modelos:
   ```python
   class DeleteResponse(BaseModel):
       success: bool
       cart_total: float
       error: Optional[str]
   ```

## Dependencias
- Historia de usuario HU-004 (Agregar al Carrito)
- Historia de usuario HU-005 (Ver Carrito)
- Sistema de persistencia del carrito
- Sistema de manejo de estado global para el carrito