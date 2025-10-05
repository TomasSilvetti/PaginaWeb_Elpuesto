# HU-016: Recuperación de Contraseña

## Descripción
**Como** usuario registrado  
**Quiero** poder recuperar mi contraseña si la olvido  
**Para** no perder acceso a mi cuenta

## Criterios de Aceptación

### 1. Solicitud de Recuperación
- Dado que olvidé mi contraseña
- Cuando ingreso mi email en el formulario de recuperación
- Entonces el sistema debe:
  - Verificar que el email exista
  - Enviar un correo con link de recuperación
  - Mostrar mensaje de confirmación de envío

### 2. Link de Recuperación
- Dado que recibo el email de recuperación
- Cuando hago clic en el link
- Entonces debo:
  - Ser dirigido a una página segura
  - Ver un formulario para nueva contraseña
  - El link debe expirar en 1 hora

### 3. Nueva Contraseña
- Dado que accedo al formulario de nueva contraseña
- Cuando ingreso la nueva contraseña
- Entonces el sistema debe:
  - Validar los requisitos de seguridad
  - Solicitar confirmar la contraseña
  - Actualizar la contraseña en la base de datos

### 4. Confirmación de Cambio
- Dado que cambio mi contraseña exitosamente
- Cuando se completa el proceso
- Entonces debo:
  - Ver mensaje de éxito
  - Ser redirigido al login
  - Poder iniciar sesión con la nueva contraseña

### 5. Manejo de Errores
- Dado que hay un error en el proceso
- Cuando intento recuperar mi contraseña
- Entonces debo:
  - Ver mensajes claros del problema
  - Tener la opción de reintentar
  - Poder contactar soporte si persiste el error

## Interfaz de Usuario

### Formularios
```typescript
interface RequestResetForm {
  email: string;
}

interface ResetPasswordForm {
  password: string;
  passwordConfirmation: string;
  token: string;
}
```

### Componentes Visuales
- Formulario de solicitud con campo de email
- Formulario de nueva contraseña
- Indicador de fortaleza de contraseña
- Mensajes de error/éxito
- Link de contacto a soporte

### Mensajes de Error
- "Email no encontrado"
- "Link expirado o inválido"
- "La contraseña no cumple los requisitos"
- "Las contraseñas no coinciden"
- "Error al enviar email"

### Mensajes de Éxito
- "Email de recuperación enviado"
- "Contraseña actualizada exitosamente"

## Especificaciones Técnicas

### Componentes Frontend
```typescript
// Componentes principales
const RequestResetForm: React.FC = () => {...}
const ResetPasswordForm: React.FC = () => {...}
const PasswordStrengthIndicator: React.FC = () => {...}

// Estado del formulario
interface ResetPasswordState {
  form: ResetPasswordForm;
  errors: string[];
  isSubmitting: boolean;
  isTokenValid: boolean;
}

// Utilidades
interface PasswordValidation {
  validateStrength: (password: string) => ValidationResult;
  validateMatch: (password: string, confirmation: string) => boolean;
}
```

### Endpoints Backend
```python
@router.post("/auth/request-reset", response_model=RequestResponse)
async def request_password_reset(email: str):
    """Enviar email con link de recuperación"""

@router.get("/auth/validate-token/{token}", response_model=TokenValidation)
async def validate_reset_token(token: str):
    """Validar token de recuperación"""

@router.post("/auth/reset-password", response_model=ResetResponse)
async def reset_password(reset_data: ResetPasswordData):
    """Actualizar contraseña"""
```

### Modelos Backend
```python
class RequestResponse(BaseModel):
    success: bool
    message: str

class TokenValidation(BaseModel):
    is_valid: bool
    expires_in: Optional[int]

class ResetPasswordData(BaseModel):
    token: str
    password: str
    password_confirmation: str

class ResetResponse(BaseModel):
    success: bool
    message: str
```

### Servicios
```python
class PasswordResetService:
    async def create_reset_token(
        email: str
    ) -> str:
        """Generar token único y guardar en base de datos"""

    async def validate_token(
        token: str
    ) -> bool:
        """Verificar validez y expiración del token"""

    async def update_password(
        token: str,
        new_password: str
    ) -> bool:
        """Actualizar contraseña del usuario"""

    async def send_reset_email(
        email: str,
        token: str
    ) -> bool:
        """Enviar email con link de recuperación"""
```

### Plantilla de Email
```html
<h2>Recuperación de Contraseña - El Puesto</h2>
<p>Hemos recibido una solicitud para recuperar tu contraseña.</p>
<p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
<a href="{reset_link}">Cambiar Contraseña</a>
<p>Este enlace expirará en 1 hora.</p>
<p>Si no solicitaste este cambio, ignora este mensaje.</p>
```

## Seguridad

### Token de Recuperación
1. Características:
   - Token seguro de 32 caracteres
   - Expiración de 1 hora
   - Un solo uso
   - Vinculado al usuario específico

2. Almacenamiento:
   - Hash del token en base de datos
   - Timestamp de creación
   - Estado (usado/no usado)

### Protección
1. Rate limiting por email e IP
2. HTTPS obligatorio
3. Validación de tokens en backend
4. Prevención de enumeración de emails
5. Encriptación de comunicaciones

## Pruebas

### Pruebas Unitarias
1. Validación de datos:
   - Formato de email
   - Fortaleza de contraseña
   - Coincidencia de contraseñas

2. Generación de tokens:
   - Unicidad
   - Formato correcto
   - Expiración

### Pruebas de Integración
1. Flujo completo:
   - Solicitud de recuperación
   - Envío de email
   - Validación de token
   - Cambio de contraseña

2. Manejo de errores:
   - Email inexistente
   - Token inválido
   - Token expirado
   - Errores de envío

### Pruebas E2E
1. Usuario final:
   - Solicitud exitosa
   - Recepción de email
   - Cambio de contraseña
   - Login con nueva contraseña

2. Seguridad:
   - Intentos múltiples
   - Tokens inválidos
   - Links expirados