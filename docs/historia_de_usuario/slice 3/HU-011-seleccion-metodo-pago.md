# HU-011: Selección de Método de Pago

## Descripción
**Como** cliente del supermercado  
**Quiero** poder seleccionar mi método de pago preferido  
**Para** completar los datos de mi compra

## Criterios de Aceptación

### 1. Opciones de Pago
- Dado que estoy en la pantalla de pago
- Cuando veo las opciones disponibles
- Entonces debo poder elegir entre:
  - Débito
  - Crédito
  - Efectivo
  - Transferencia

### 2. Información de Tarjeta
- Dado que selecciono pago con débito o crédito
- Cuando ingreso los datos
- Entonces debo poder especificar:
  - Banco al que pertenece la tarjeta (desplegable con opciones)

### 3. Pago en Efectivo
- Dado que selecciono pago en efectivo
- Cuando vea los detalles
- Entonces debo ver:
  - El monto exacto a pagar
  - Instrucciones para el pago al repartidor

### 4. Pago por Transferencia
- Dado que selecciono pago por transferencia
- Cuando vea los detalles
- Entonces debo ver:
  - Instrucciones para el pago al repartidor (pago con QR)

### 5. Validaciones
- Dado que selecciono un método de pago
- Cuando intento continuar
- Entonces el sistema debe validar que:
  - Se haya seleccionado un método de pago
  - Si es tarjeta, se haya seleccionado el banco

## Interfaz de Usuario

### Formulario de Pago
```typescript
interface PaymentForm {
  method: 'Debito' | 'Credito' | 'Efectivo' | 'Transferencia';
  bankCard?: string;  // Banco de la tarjeta
}
```

### Componentes Visuales
- Radio buttons para método de pago
- Selector desplegable de bancos (para tarjetas)
- Código QR para transferencia
- Información relevante según método
- Botón "Confirmar Pago"
- Botón "Volver"

### Mensajes de Error
- "Seleccione un método de pago"
- "Seleccione el banco de la tarjeta"

## Especificaciones Técnicas

### Componentes Frontend
```typescript
// Componentes principales
const PaymentMethodSelector: React.FC = () => {...}
const CardDetailsForm: React.FC = () => {...}
const CashPaymentInfo: React.FC = () => {...}
const TransferDetails: React.FC = () => {...}

// Validaciones
interface PaymentValidation {
  isValid: boolean;
  errors: string[];
  validatePaymentMethod: (method: string, shippingMethod: string) => boolean;
  validateBankCard: (method: string, bank: string) => boolean;
}

// Interfaces
interface BankOption {
  id: string;
  name: string;
}

interface PaymentInstructions {
  title: string;
  steps: string[];
  additionalInfo?: string;
}
```

### Endpoints Backend
```python
@router.get("/payment/methods", response_model=List[PaymentMethod])
async def get_payment_methods(shipping_method: str):
    """Obtener métodos de pago disponibles según método de envío"""

@router.get("/payment/banks", response_model=List[Bank])
async def get_bank_list():
    """Obtener lista de bancos para tarjetas"""

@router.post("/payment/validate", response_model=ValidationResponse)
async def validate_payment(info: PaymentInfo):
    """Validar información de pago"""
```

### Modelos Backend
```python
class PaymentInfo(BaseModel):
    method: Literal['Debito', 'Credito', 'Efectivo', 'Transferencia']
    bank_card: Optional[str]
    shipping_method: str

class ValidationResponse(BaseModel):
    is_valid: bool
    errors: List[str]

class Bank(BaseModel):
    id: UUID
    name: str
```

## Pruebas

### Pruebas Unitarias
1. Validación de método de pago:
   - Selección de método válido
   - Compatibilidad con método de envío
   - Validación de banco para tarjetas

2. Formateo y validación:
   - Selección de banco

### Pruebas de Integración
1. Flujo completo de pago
2. Persistencia de selección
3. Actualización de orden

### Pruebas de Usuario
1. Claridad en opciones de pago
2. Facilidad de ingreso de datos
3. Visibilidad de instrucciones
4. Manejo de errores