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

## Plan de Implementación Futura

### Fase 1: Post-MVP
- Implementar carritos para usuarios anónimos
- Agregar session_id y manejo de cookies
- Sistema básico de expiración

### Fase 2: Optimización
- Sistema completo de gestión de expiración
- Limpieza automática de carritos
- Notificaciones a usuarios

### Fase 3: Características Avanzadas
- Persistencia de carritos entre sesiones
- Sincronización entre dispositivos
- Sistema de recuperación de carritos abandonados
- Analytics de comportamiento de usuarios