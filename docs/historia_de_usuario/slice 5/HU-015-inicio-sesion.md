# HU-015: Inicio de Sesión

## Descripción
**Como** usuario registrado  
**Quiero** poder iniciar sesión en mi cuenta  
**Para** acceder a mis datos personales y historial de compras

## Criterios de Aceptación

### 1. Formulario de Login
- Dado que soy un usuario registrado
- Cuando accedo al formulario de inicio de sesión
- Entonces debo ver:
  - Campo para email
  - Campo para contraseña
  - Checkbox "Recordarme"
  - Link "¿Olvidaste tu contraseña?"
  - Botón "Iniciar Sesión"
  - Link para registrarse si no tiene cuenta

### 2. Validación de Credenciales
- Dado que ingreso mis credenciales
- Cuando presiono "Iniciar Sesión"
- Entonces el sistema debe:
  - Verificar que el email exista
  - Validar que la contraseña sea correcta

### 3. Inicio de Sesión Exitoso
- Dado que ingreso credenciales válidas
- Cuando el sistema las verifica
- Entonces debe:
  - Crear una sesión activa
  - Redirigir a la última página visitada o al inicio
  - Si hay un carrito temporal, transferirlo a mi cuenta

### 4. Manejo de Errores
- Dado que hay un error en el inicio de sesión
- Cuando intento acceder
- Entonces debo:
  - Ver mensajes claros sobre el problema
  - Mantener el email ingresado
  - Ver cuántos intentos me quedan
  - Recibir sugerencias de solución

### 5. Función "Recordarme"
- Dado que marco "Recordarme"
- Cuando inicio sesión exitosamente
- Entonces:
  - Mi sesión debe persistir entre cierres del navegador
  - Debo poder cerrar sesión manualmente en cualquier momento

## Interfaz de Usuario

### Formulario Principal
```typescript
interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}
```

### Componentes Visuales
- Campo de email con validación de formato
- Campo de contraseña con opción de mostrar/ocultar
- Checkbox "Recordarme"
- Botón principal "Iniciar Sesión"
- Links secundarios:
  - "¿Olvidaste tu contraseña?"
  - "Crear cuenta"
- Indicador de intentos restantes
- Mensajes de error/éxito

### Mensajes de Error
- "Email o contraseña incorrectos"
- "La sesión ha expirado"
- "Error de conexión"

## Especificaciones Técnicas

### Componentes Frontend
```typescript
// Componentes principales
const LoginForm: React.FC = () => {...}
const RememberMeToggle: React.FC = () => {...}
const LoginErrorDisplay: React.FC = () => {...}

// Estado del formulario
interface LoginState {
  form: LoginForm;
  errors: string[];
  isSubmitting: boolean;
}

// Servicios
interface AuthService {
  login: (credentials: LoginForm) => Promise<LoginResponse>;
  validateSession: () => Promise<boolean>;
  refreshToken: () => Promise<string>;
  logout: () => Promise<void>;
}
```

### Endpoints Backend
```python
@router.post("/auth/login", response_model=LoginResponse)
async def login_user(credentials: LoginCredentials):
    """Validar credenciales y retornar tokens de acceso"""

@router.post("/auth/refresh", response_model=TokenResponse)
async def refresh_token(refresh_token: str):
    """Renovar token de acceso usando refresh token"""

@router.post("/auth/logout")
async def logout_user():
    """Invalidar tokens y cerrar sesión"""

@router.get("/auth/validate", response_model=ValidationResponse)
async def validate_session():
    """Validar estado de la sesión actual"""
```

### Modelos Backend
```python
class LoginCredentials(BaseModel):
    email: EmailStr
    password: str
    remember_me: bool = False

class LoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    user: UserBasicInfo
    redirect_url: Optional[str]

class TokenResponse(BaseModel):
    access_token: str
    expires_in: int

class ValidationResponse(BaseModel):
    is_valid: bool
    expires_in: Optional[int]
```

### Servicios de Autenticación
```python
class AuthenticationService:
    async def authenticate_user(
        email: str,
        password: str
    ) -> User:
        """Validar credenciales y retornar usuario"""

    async def create_session(
        user_id: UUID,
        remember_me: bool
    ) -> Tokens:
        """Crear tokens de sesión"""

    async def validate_session(
        token: str
    ) -> bool:
        """Validar token de sesión"""

    async def migrate_cart(
        anonymous_cart_id: str,
        user_id: UUID
    ) -> None:
        """Migrar carrito anónimo a usuario"""
```

## Seguridad

### Gestión de Tokens
1. Access Token:
   - JWT con expiración corta (15 minutos)
   - Contiene ID de usuario y roles
   - Se envía en header Authorization

2. Refresh Token:
   - Token seguro con expiración larga (30 días si "Recordarme")
   - Almacenado en httpOnly cookie
   - Rotación en cada uso

### Protección
1. Rate limiting por IP y email
2. HTTPS obligatorio
3. Prevención de fuerza bruta
4. Headers de seguridad:
   - CSRF Token
   - Content Security Policy
   - X-Frame-Options

## Pruebas

### Pruebas Unitarias
1. Validación de credenciales:
   - Email y contraseña correctos
   - Email inexistente
   - Contraseña incorrecta
   - Formato inválido de email

2. Estado de la sesión:
   - Creación de tokens
   - Validación de tokens
   - Expiración de sesión
   - Refresh de tokens

### Pruebas de Integración
1. Flujo de autenticación:
   - Login exitoso
   - Manejo de errores
   - Migración de carrito

2. Persistencia de sesión:
   - Con "Recordarme" activo
   - Sin "Recordarme"
   - Cierre de sesión manual
   - Expiración automática

### Pruebas E2E
1. Flujo completo:
   - Login exitoso
   - Redirección correcta
   - Persistencia de datos
   - Cierre de sesión

2. Escenarios de error:
   - Credenciales inválidas
   - Sesión expirada
   - Sin conexión