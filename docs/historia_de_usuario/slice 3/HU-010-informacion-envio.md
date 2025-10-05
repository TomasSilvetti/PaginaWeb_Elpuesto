# HU-010: Información de Envío

## Descripción
**Como** cliente del supermercado  
**Quiero** poder ingresar mi dirección de envío  
**Para** recibir mis productos en la ubicación correcta

## Criterios de Aceptación

### 1. Formulario de Dirección
- Dado que estoy en el proceso de checkout
- Cuando ingreso mis datos de envío
- Entonces debo poder ingresar:
  - Dirección completa
  - Ciudad
  - Código postal
  - Número de teléfono de contacto
  - Notas adicionales para la entrega (opcional)

### 2. Validación de Campos
- Dado que estoy completando el formulario
- Cuando intento avanzar al siguiente paso
- Entonces el sistema debe validar que:
  - La dirección no esté vacía
  - La ciudad esté seleccionada
  - El código postal tenga el formato correcto
  - El teléfono tenga un formato válido

### 3. Métodos de Envío
- Dado que he ingresado una dirección válida
- Cuando selecciono el método de envío
- Entonces debo poder elegir entre:
  - Envío (si se recibe en la mañana, se entrega el mismo día; si se recibe en la tarde, se entrega al día siguiente)
  - Retiro en tienda

### 4. Costos de Envío
- Dado que selecciono un método de envío
- Cuando veo el resumen
- Entonces debo ver:
  - El costo asociado al método seleccionado
  - El tiempo estimado de entrega
  - El costo actualizado en el total de la orden

### 5. Guardar Información
- Dado que soy un usuario registrado
- Cuando completo una dirección de envío
- Entonces debo tener la opción de:
  - Guardar la dirección para futuros pedidos
  - Marcarla como dirección predeterminada

## Interfaz de Usuario

### Formulario de Dirección
```typescript
interface ShippingForm {
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  notes?: string;
  shippingMethod: 'Envío' | 'Retiro en tienda';
  saveAddress?: boolean;
  setAsDefault?: boolean;
}
```

### Componentes Visuales
- Campo de texto para dirección
- Selector de ciudad
- Campo para código postal
- Campo para teléfono
- Área de texto para notas
- Radio buttons para método de envío
- Checkbox para guardar dirección
- Checkbox para establecer como predeterminada
- Botones de navegación

### Mensajes de Error
- "La dirección es obligatoria"
- "Seleccione una ciudad"
- "Código postal inválido"
- "Número de teléfono inválido"
- "Seleccione un método de envío"

## Especificaciones Técnicas

### Componentes Frontend
```typescript
// Componentes principales
const ShippingForm: React.FC = () => {...}
const CitySelector: React.FC<{cities: City[]}> = () => {...}
const ShippingMethodSelector: React.FC = () => {...}
const AddressValidator: React.FC = () => {...}

// Validaciones
const validatePostalCode = (code: string): boolean => {...}
const validatePhone = (phone: string): boolean => {...}

// Interfaces
interface ShippingMethod {
  name: 'Envío' | 'Retiro en tienda';
  price: number;
  estimatedDelivery: string; // Descripción del tiempo de entrega
}

interface City {
  id: string;
  name: string;
  available: boolean;
}
```

### Endpoints Backend
```python
@router.post("/shipping/validate", response_model=ValidationResponse)
async def validate_shipping_info(info: ShippingInfo):
    """Validar información de envío"""

@router.get("/shipping/cities", response_model=List[City])
async def get_available_cities():
    """Obtener lista de ciudades disponibles"""

@router.get("/shipping/methods", response_model=List[ShippingMethod])
async def get_shipping_methods(city: str):
    """Obtener métodos de envío disponibles y costos"""

@router.post("/shipping/save-address", response_model=SavedAddress)
async def save_shipping_address(address: ShippingAddress):
    """Guardar dirección para usuario registrado"""
```

### Modelos Backend
```python
class ShippingInfo(BaseModel):
    address: str
    city: str
    postal_code: str
    phone: str
    notes: Optional[str]
    shipping_method: Literal['Envío', 'Retiro en tienda']

class ValidationResponse(BaseModel):
    is_valid: bool
    errors: Dict[str, str]

class City(BaseModel):
    id: UUID
    name: str
    available: bool

class ShippingMethod(BaseModel):
    id: str
    name: str
    price: float
    estimated_days: int
```

## Pruebas

### Pruebas Unitarias
1. Validación de formatos:
   - Código postal
   - Número de teléfono
   - Campos requeridos

2. Cálculo de costos de envío:
   - Por método de envío
   - Por ciudad

### Pruebas de Integración
1. Flujo completo de ingreso de dirección
2. Guardado de direcciones para usuarios
3. Cálculo de costos totales

### Pruebas de Usuario
1. Claridad de mensajes de error
2. Facilidad de ingreso de datos
3. Selección de método de envío
4. Visualización de costos