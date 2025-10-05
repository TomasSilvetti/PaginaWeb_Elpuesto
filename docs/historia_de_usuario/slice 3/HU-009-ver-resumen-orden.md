# HU-009: Ver Resumen de Orden

## Descripción
**Como** cliente del supermercado  
**Quiero** ver un resumen de mi orden antes de confirmarla  
**Para** asegurarme de que todo está correcto

## Criterios de Aceptación

### 1. Mostrar Detalles de Productos
- Dado que he creado una orden
- Cuando veo el resumen
- Entonces debo ver para cada producto:
  - Nombre del producto
  - Cantidad (para productos por unidad) o peso (para productos pesables)
  - Precio unitario o por kilo según corresponda
  - Subtotal por ítem

### 2. Mostrar Costos
- Dado que veo el resumen de la orden
- Cuando reviso los costos
- Entonces debo ver:
  - Subtotal de productos
  - Costo de envío
  - Total final
  - Método de pago seleccionado

### 3. Mostrar Información de Envío
- Dado que veo el resumen de la orden
- Cuando reviso la información de envío
- Entonces debo ver:
  - Dirección de entrega completa
  - Ciudad
  - Código postal
  - Número de teléfono de contacto
  - Método de envío seleccionado

### 4. Navegación
- Dado que estoy en el resumen de la orden
- Cuando necesito modificar algún dato
- Entonces debo poder:
  - Volver atrás para modificar la información de envío
  - Volver atrás para cambiar el método de pago
  - Avanzar para confirmar la orden

### 5. Visualización de Notas
- Dado que agregué notas especiales a mi orden
- Cuando veo el resumen
- Entonces debo ver las notas especiales en una sección dedicada

## Interfaz de Usuario

### Vista Principal
- Título "Resumen de Orden"
- Secciones claramente diferenciadas:
  1. Lista de productos
  2. Información de envío
  3. Detalles de pago
  4. Notas especiales
  5. Resumen de costos

### Elementos de Navegación
- Botón "Modificar Información de Envío"
- Botón "Cambiar Método de Pago"
- Botón "Confirmar Orden"
- Botón "Volver al Carrito"

### Formato de Visualización
```typescript
interface OrderSummaryDisplay {
  // Productos
  items: {
    name: string;
    quantity?: number;
    weight?: number;
    unitPrice?: number;
    weightPrice?: number;
    subtotal: number;
    saleType: 'UNIDAD' | 'PESABLE' | 'MIXTO';
  }[];
  
  // Envío
  shipping: {
    address: string;
    city: string;
    postalCode: string;
    phone: string;
    method: string;
  };
  
  // Pagos
  payment: {
    method: string;
    bankCard?: string;
  };
  
  // Costos
  costs: {
    subtotal: number;
    shippingCost: number;
    total: number;
  };
  
  notes?: string;
}
```

## Especificaciones Técnicas

### Componentes Frontend
```typescript
// Página principal
const OrderSummaryPage: React.FC = () => {...}

// Componentes de sección
const ProductsList: React.FC<{items: OrderItem[]}> = () => {...}
const ShippingDetails: React.FC<{shipping: ShippingInfo}> = () => {...}
const PaymentDetails: React.FC<{payment: PaymentInfo}> = () => {...}
const CostsSummary: React.FC<{costs: OrderCosts}> = () => {...}
```

### Endpoint Backend
```python
@router.get("/orders/{order_id}/summary", response_model=OrderSummaryResponse)
async def get_order_summary(order_id: UUID):
    """
    Obtener resumen completo de la orden incluyendo:
    1. Items con sus detalles
    2. Información de envío
    3. Información de pago
    4. Costos totales
    5. Notas especiales
    """
```

### Modelos
```python
class OrderSummaryResponse(BaseModel):
    order_id: UUID
    status: str
    items: List[OrderItemDetail]
    shipping: ShippingDetails
    payment: PaymentDetails
    costs: OrderCosts
    notes: Optional[str]
```

## Pruebas

### Pruebas Unitarias
1. Cálculo correcto de subtotales por ítem
2. Cálculo correcto del total general
3. Formateo de precios y cantidades
4. Visualización condicional de peso/cantidad

### Pruebas de Integración
1. Carga completa del resumen
2. Navegación entre secciones
3. Persistencia de datos al navegar

### Pruebas de Usuario
1. Verificar claridad de la información
2. Facilidad de navegación
3. Visibilidad de todos los detalles importantes