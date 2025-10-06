# HU-008: Crear Orden

## Descripción
**Como** cliente del supermercado  
**Quiero** poder convertir mi carrito en una orden de compra  
**Para** finalizar mi proceso de compra

## Criterios de Aceptación

### 1. Validación de Stock
- Dado que tengo productos por unidad en mi carrito
- Cuando intento crear una orden
- Entonces el sistema debe validar que hay stock suficiente para cada producto
- Y si hay stock insuficiente, debe mostrar un mensaje claro indicando qué productos no tienen stock suficiente

### 2. Cálculo de Totales
- Dado que tengo productos en mi carrito
- Cuando creo una orden
- Entonces el sistema debe:
  - Calcular el subtotal sumando todos los productos
  - Mostrar el costo de envío según la dirección
  - Calcular y mostrar el total final (subtotal + envío)

### 3. Conservación de Precios
- Dado que tengo productos en mi carrito
- Cuando creo una orden
- Entonces el sistema debe conservar los precios actuales del carrito en la orden
- Y esos precios no deben cambiar aunque los precios de los productos cambien después

### 4. Limpieza del Carrito
- Dado que creo una orden exitosamente
- Cuando la orden se confirma
- Entonces el carrito debe quedar vacío

### 5. Estado Inicial de la Orden
- Dado que creo una orden
- Cuando se completa la creación
- Entonces la orden debe quedar en estado "PENDIENTE"
- Y debe generarse un número de orden único

### 6. Validación de Productos Pesables
- Dado que tengo productos pesables en el carrito
- Cuando creo la orden
- Entonces el sistema debe validar que cada producto pesable tenga un peso válido especificado


## Interfaz de Usuario

### Vista del Resumen del Carrito
- Mostrar lista de productos con:
  - Nombre del producto
  - Cantidad/Peso
  - Precio unitario/por kilo
  - Subtotal por ítem
- Subtotal del carrito
- Botón "Crear Orden"

### Mensajes de Error
- "Stock insuficiente para: [lista de productos]"
- "Debe especificar el peso para: [productos pesables]"
- "Error al crear la orden. Por favor, intente nuevamente"

### Mensajes de Éxito
- "Orden #[número] creada exitosamente"
- "Su pedido está siendo procesado"

## Especificaciones Técnicas

### Componentes Frontend
```javascript
interface CreateOrderRequest {
  cartId: string;
  userId: string;
}

interface CreateOrderResponse {
  orderId: string;
  status: 'PENDIENTE';
  orderNumber: string;
  subtotal: number;
  total: number;
}

// Componentes React necesarios
const OrderCreationPage = () => {...}
const OrderSummary = () => {...}
const StockValidationError = () => {...}
```

### Endpoints Backend
```python
@router.post("/orders", response_model=CreateOrderResponse)
async def create_order(request: CreateOrderRequest):
    """
    1. Validar stock de productos por unidad
    2. Validar que los productos pesables tengan peso especificado
    3. Calcular totales
    4. Crear orden con items
    5. Vaciar carrito
    """
```

### Modelos
```python
class CreateOrderRequest(BaseModel):
    cart_id: UUID
    user_id: UUID

class CreateOrderResponse(BaseModel):
    order_id: UUID
    status: str
    order_number: str
    subtotal: float
    total: float
```

## Pruebas

### Pruebas Unitarias
1. Validación de stock
2. Cálculo de totales
3. Conservación de precios
4. Limpieza de carrito

### Pruebas de Integración
1. Flujo completo de creación de orden
2. Manejo de errores de stock
3. Validación de productos pesables

### Pruebas de Usuario
1. Visualización correcta de mensajes
2. Flujo de creación de orden
3. Validación de carrito vacío post-orden