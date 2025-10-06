# Historia de Usuario: Agregar al Carrito (HU-C1)

## Descripción
**Como** cliente del supermercado  
**Quiero** poder agregar productos a mi carrito de compras  
**Para** ir acumulando los productos que deseo comprar

## Criterios de Aceptación

### Criterios de Aceptación

1. Dado que estoy viendo un producto
   Cuando miro su información
   Entonces veo el botón "Agregar al Carrito" en:
   - La tarjeta del producto en el catálogo
   - La vista detallada del producto

2. Dado que quiero agregar un producto por unidad
   Cuando uso la función de agregar al carrito
   Entonces:
   - Puedo seleccionar la cantidad en números enteros usando un boton + o -
   - No puedo exceder el stock disponible
   - La cantidad debe ser mayor a cero

3. Dado que quiero agregar un producto por peso
   Cuando uso la función de agregar al carrito
   Entonces:
   - Puedo seleccionar la cantidad con un boton + o - en incrementos de 100g
   - No puedo ingresar menos de 100g
   - No hay validación de stock

4. Dado que quiero agregar un producto mixto
   Cuando uso la función de agregar al carrito
   Entonces:
   - Veo un switch para elegir tipo de venta
   - Cuando selecciona el modo individual permite seleccionar la cantidad con un boton + o - en números enteros
   - Cuando selecciona el modo por peso permite seleccionar la cantidad con un boton + o - en incrementos de 100g
   - No veo validaciones de stock
   - Veo un recordatorio de que el precio es referencial
   - El sistema lo trata como producto por peso internamente

5. Dado que ocurre un error al agregar
   Cuando el sistema detecta el problema
   Entonces veo un mensaje claro explicando:
   - Si hay stock insuficiente
   - Si la cantidad/peso es inválido
   - Si hay error de conexión

6. Dado que soy un usuario no registrado
   Cuando agrego productos al carrito
   Entonces:
   - Los productos se guardan en localStorage
   - Persisten entre recargas de página
   - Persiste si se registra o inicia sesión

7. Dado que tengo productos en el carrito local
   Cuando inicio sesión
   Entonces:
   - Los productos locales se fusionan con mi carrito en la base de datos
   - No pierdo ningún producto seleccionado

## Detalles Técnicos

### Frontend (React + Vite)
1. Componentes Necesarios:
   ```typescript
   // Componentes
   AddToCartButton.jsx
   IncrementDecrementInput.jsx    // Componente reutilizable para botones + y -
   SaleTypeSwitch.jsx            // Switch para productos mixtos
   ErrorMessage.jsx              // Componente para mostrar errores
   
   // Hooks
   useCart.ts
   useCartPersistence.ts
   useIncrementDecrement.ts      // Lógica para manejo de incrementos
   ```

2. Interfaces:
   ```typescript
   interface CartItem {
     id: string;
     productId: string;
     displayQuantity?: number;     // Para mostrar al usuario en productos mixtos
     weight?: number;             // Para productos por peso, en gramos
     saleType: 'UNIDAD' | 'PESABLE';
     weightPrice: number;         // Precio por kilo para productos pesables y mixtos
     isPriceEstimated: boolean;   // true para productos mixtos
     timestamp: Date;
     increment: number;           // 1 para unidades, 100 para peso en gramos
     minValue: number;           // 1 para unidades, 100 para peso en gramos
   }

   interface AddToCartParams {
     productId: string;
     saleType: 'UNIDAD' | 'PESABLE';
     quantity?: number;
     weight?: number;
   }
   ```

### Backend (FastAPI)
1. Endpoints Necesarios:
   ```python
   # Agregar item al carrito
   POST /api/cart/items
   Request: {
     product_id: str,
     sale_type: Literal['UNIDAD', 'PESABLE'],
     quantity?: int,
     weight?: float
   }
   Response: {
     cart_item_id: str,
     success: bool,
     message: str
   }

   # Obtener carrito actual
   GET /api/cart
   Response: {
     items: CartItem[],
     total: float
   }

   # Fusionar carritos (post-login)
   POST /api/cart/merge
   Request: {
     local_items: CartItem[]
   }
   Response: {
     success: bool,
     merged_cart: CartItem[]
   }
   ```

2. Modelos:
   ```python
   class CartItem(BaseModel):
       id: str
       cart_id: str
       product_id: str
       quantity: Optional[int]          # Para productos por unidad y mixtos en modo unidad
       weight: Optional[float]          # Para productos por peso y mixtos (siempre en gramos)
       sale_type: Literal['UNIDAD', 'PESABLE']
       weight_price_at_time: float      # Precio por kilo, siempre requerido para mixtos
       display_unit_price: Optional[float]  # Precio por unidad para display en mixtos
       is_price_estimated: bool         # True para productos mixtos
       created_at: datetime

   class AddToCartRequest(BaseModel):
       product_id: str
       sale_type: Literal['UNIDAD', 'PESABLE']
       quantity: Optional[int]
       weight: Optional[float]
   ```

## Dependencias
- Tabla CART_ITEMS en base de datos
- Componentes de catálogo implementados (HU-001)
- Sistema de notificaciones frontend
- Manejo de estado global para el carrito
- Sistema de autenticación (para usuarios registrados)