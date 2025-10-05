# Funcionalidades para Futuras Iteraciones

## Gestión de Carritos
### Carritos para Usuarios Anónimos
- **Descripción**: Sistema de carritos basado en sesiones para usuarios no registrados
- **Campos Necesarios**:
  - session_id
  - expires_at
  - Sistema de limpieza automática
- **Beneficios**:
  - Permite compras sin registro
  - Mejor experiencia para usuarios nuevos
  - Posibilidad de convertir carritos anónimos a usuarios registrados

### Sistema de Expiración de Carritos
- **Descripción**: Gestión automática del ciclo de vida de carritos
- **Funcionalidades**:
  - Limpieza automática de carritos abandonados
  - Restauración de stock de productos en carritos expirados
  - Notificaciones a usuarios sobre carritos por expirar
- **Beneficios**:
  - Mejor gestión de inventario
  - Base de datos más limpia
  - Posibilidad de remarketing

## Simplificación para MVP

### Tabla CARTS (Versión MVP)
```sql
CREATE TABLE carts (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Enfoque MVP
1. Solo carritos para usuarios registrados
2. Sin sistema de expiración automática
3. Sin gestión de sesiones
4. Mantener solo timestamps básicos para auditoría

### Beneficios de la Simplificación
1. Desarrollo más rápido
2. Menos complejidad en la lógica de negocio
3. Más fácil de mantener inicialmente
4. Suficiente para validar el modelo de negocio

## Priorización de Implementaciones Futuras

### Prioridad Alta
- **Carritos para Usuarios Anónimos**
  - Implementación del sistema basado en sesiones
  - Agregar session_id y manejo de cookies
  - Conversión de carritos anónimos a usuarios registrados

- **Sistema Básico de Expiración**
  - Limpieza básica de carritos abandonados
  - Restauración de stock al expirar

### Prioridad Media
- **Gestión Avanzada de Expiración**
  - Sistema completo de gestión del ciclo de vida
  - Limpieza automática programada
  - Notificaciones a usuarios sobre expiración

- **Persistencia y Sincronización**
  - Persistencia de carritos entre sesiones
  - Sincronización entre dispositivos

### Prioridad Baja
- **Analytics y Recuperación**
  - Sistema de recuperación de carritos abandonados
  - Analytics de comportamiento de usuarios
  - Remarketing basado en carritos abandonados

- **Formulario de Contacto Web**
  - Implementación de formulario web para consultas y reclamos
  - Sistema de tickets para seguimiento de consultas
  - Integración con sistema de emails para notificaciones
  - Autocompletado con información de órdenes
  - Priorizado para segunda fase del proyecto ya que inicialmente se manejará vía WhatsApp

- **Funcionalidad de Deshacer Eliminación**
  - Botón "Deshacer" visible por 5 segundos
  - Restauración del producto con cantidad/peso original
  - Actualización automática de totales
  - Componentes necesarios: UndoButton, ConfirmDialog
  - Endpoint: POST /api/cart/items/{item_id}/restore