# HU-014: Registro de Usuario

## Descripción
**Como** visitante del supermercado  
**Quiero** poder crear una cuenta de usuario  
**Para** tener acceso a funcionalidades personalizadas y seguimiento de mis pedidos

## Criterios de Aceptación

### 1. Formulario de Registro
- Dado que soy un visitante
- Cuando accedo al formulario de registro
- Entonces debo ver campos para:
  - Nombre
  - Apellido
  - Email
  - Contraseña
  - Confirmación de contraseña
  - Teléfono
  - Checkbox para aceptar términos y condiciones

### 2. Validación de Datos
- Dado que estoy completando el formulario
- Cuando intento registrarme
- Entonces el sistema debe validar que:
  - El email tenga formato válido y no esté registrado
  - La contraseña cumpla requisitos mínimos de seguridad
  - Las contraseñas coincidan
  - El teléfono tenga formato válido
  - Todos los campos obligatorios estén completos
  - Los términos y condiciones estén aceptados

### 3. Proceso de Registro
- Dado que completo el formulario correctamente
- Cuando presiono "Registrarme"
- Entonces el sistema debe:
  - Crear mi cuenta
  - Mostrar mensaje de éxito
  - Iniciar sesión automáticamente
  - Redirigir a la última página visitada o a la página principal

### 4. Manejo de Errores
- Dado que hay un error en el registro
- Cuando intento crear la cuenta
- Entonces debo:
  - Ver mensajes claros indicando el problema
  - Mantener los datos ya ingresados (excepto contraseña)
  - Poder corregir y reintentar

### 5. Integración con Carrito
- Dado que tengo productos en el carrito como visitante
- Cuando completo mi registro exitosamente
- Entonces:
  - Los productos deben mantenerse en mi carrito
  - El carrito debe asociarse a mi nueva cuenta

## Interfaz de Usuario

### Formulario Principal
```typescript
interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  phone: string;
  termsAccepted: boolean;
}
```

### Componentes Visuales
- Campos de texto para datos personales
- Campo de contraseña con indicador de fortaleza
- Checkbox para términos y condiciones con link
- Botón "Registrarme"
- Link a "Iniciar Sesión" si ya tiene cuenta
- Mensajes de error/éxito
- Indicadores de campos obligatorios

### Validaciones de Contraseña
- Mínimo 8 caracteres
- Al menos una letra mayúscula
- Al menos una letra minúscula
- Al menos un número
- Al menos un carácter especial

### Mensajes de Error
- "El email ya está registrado"
- "La contraseña no cumple los requisitos de seguridad"
- "Las contraseñas no coinciden"
- "Formato de teléfono inválido"
- "Debe aceptar los términos y condiciones"

## Especificaciones Técnicas

### Componentes Frontend
```typescript
// Componentes principales
const RegistrationForm: React.FC = () => {...}
const PasswordStrengthIndicator: React.FC = () => {...}
const TermsAndConditions: React.FC = () => {...}

// Validaciones
interface RegistrationValidation {
  validateEmail: (email: string) => Promise<boolean>;
  validatePassword: (password: string) => ValidationResult;
  validatePhone: (phone: string) => boolean;
  checkEmailAvailability: (email: string) => Promise<boolean>;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  strength?: 'weak' | 'medium' | 'strong';
}

// Estado del formulario
interface RegistrationState {
  form: RegistrationForm;
  errors: Partial<Record<keyof RegistrationForm, string>>;
  isSubmitting: boolean;
  isSuccessful: boolean;
  redirectTo?: string; // Última página visitada
}
```

### Endpoints Backend
```python
@router.post("/auth/register", response_model=UserResponse)
async def register_user(user: UserCreate, redirect_url: Optional[str] = None):
    """Crear nuevo usuario y retornar token de autenticación y URL de redirección"""

@router.post("/auth/check-email", response_model=EmailCheckResponse)
async def check_email_availability(email: str):
    """Verificar disponibilidad de email"""
```

### Modelos Backend
```python
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    phone: str

class UserResponse(BaseModel):
    id: UUID
    email: str
    first_name: str
    last_name: str
    phone: str
    created_at: datetime
    token: str
    redirect_url: Optional[str]  # URL para redirección post-registro

class EmailCheckResponse(BaseModel):
    email: str
    available: bool
```

### Servicios
```python
class AuthService:
    async def create_user(
        user_data: UserCreate
    ) -> User:
        """Crear nuevo usuario con password hasheado"""

    async def check_email_exists(
        email: str
    ) -> bool:
        """Verificar si email ya está registrado"""

    async def generate_auth_token(
        user: User
    ) -> str:
        """Generar token de autenticación"""

    async def migrate_anonymous_cart(
        anonymous_cart_id: str,
        user_id: UUID
    ) -> None:
        """Migrar carrito anónimo a usuario registrado"""
```

## Pruebas

### Pruebas Unitarias
1. Validaciones:
   - Formato de email
   - Fortaleza de contraseña
   - Formato de teléfono
   - Coincidencia de contraseñas

2. Estado del formulario:
   - Manejo de errores
   - Limpieza de campos
   - Persistencia de datos no sensibles

### Pruebas de Integración
1. Proceso de registro:
   - Creación exitosa de usuario
   - Manejo de email duplicado
   - Migración de carrito
   - Generación de token

2. Validaciones backend:
   - Hash de contraseña
   - Unicidad de email
   - Formato de datos

### Pruebas E2E
1. Flujo completo:
   - Registro exitoso
   - Inicio de sesión automático
   - Redirección a última página visitada
   - Redirección a página principal cuando no hay página previa

2. Manejo de errores:
   - Campos inválidos
   - Email duplicado
   - Errores de servidor
   - Persistencia de URL de redirección durante errores

## Consideraciones de Seguridad
1. Hash de contraseña con bcrypt
2. Validación de fortaleza de contraseña
3. Protección contra ataques de fuerza bruta
4. Rate limiting en endpoints
5. Sanitización de inputs
6. Tokens JWT para autenticación
7. HTTPS obligatorio