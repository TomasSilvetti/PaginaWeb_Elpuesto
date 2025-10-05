u# HU-013: Ver Información de Contacto

## Descripción
**Como** cliente del supermercado  
**Quiero** ver la información de contacto del supermercado  
**Para** poder comunicarme por WhatsApp si tengo consultas o problemas con mi pedido

## Criterios de Aceptación

### 1. Visualización de Información de Contacto
- Dado que estoy en cualquier página de la aplicación
- Cuando busco la información de contacto
- Entonces debo ver:
  - Número de WhatsApp del supermercado
  - Horario de atención
  - Botón para iniciar chat de WhatsApp directamente

### 2. Botón de WhatsApp
- Dado que veo el botón de WhatsApp
- Cuando hago clic en él
- Entonces debe:
  - Abrirse WhatsApp Web o la aplicación de WhatsApp
  - Pre-cargar el número del supermercado

### 3. Mensaje Predeterminado
- Dado que inicio un chat desde una página de orden
- Cuando se abre WhatsApp
- Entonces el mensaje predeterminado debe incluir:
  - Saludo formal
  - Espacio para que el cliente escriba su consulta

### 4. Ubicación del Botón
- Dado que navego por el sitio
- Cuando miro la interfaz
- Entonces debo ver:
  - Un botón flotante de WhatsApp siempre visible
  - El botón no debe interferir con el contenido principal
  - El botón debe ser visible pero no intrusivo

## Interfaz de Usuario

### Componentes Visuales
- Botón flotante de WhatsApp (fixed position)
- Ícono de WhatsApp
- Tooltip con horario de atención
- Indicador de "En línea" durante horario de atención

### Mensaje Predeterminado
```typescript
interface WhatsAppMessage {
  baseText: string;
}
```

### Formato de Mensaje
```text
¡Hola! Me contacto desde la web de El Puesto.
```

## Especificaciones Técnicas

### Componentes Frontend
```typescript
// Componente principal
const WhatsAppButton: React.FC<{
  position?: 'bottom-right' | 'bottom-left';
}> = () => {...}

// Interfaces
interface WhatsAppConfig {
  phoneNumber: string;
  businessHours: {
    start: string; // "HH:mm"
    end: string;   // "HH:mm"
    timezone: string;
  };
}

// Utilidades
const formatWhatsAppUrl = (
  phone: string,
  message: string
): string => {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

const isBusinessHours = (config: WhatsAppConfig): boolean => {...}
```

### Configuración
```typescript
const WHATSAPP_CONFIG: WhatsAppConfig = {
  phoneNumber: "549XXXXXXXXX", // Número de WhatsApp del supermercado
  businessHours: {
    start: "09:00",
    end: "18:00",
    timezone: "America/Argentina/Buenos_Aires"
  }
};
```

## Pruebas

### Pruebas Unitarias
1. Formateo de URL de WhatsApp:
   - Con mensaje base
   - Con caracteres especiales

2. Validación de horario comercial:
   - Dentro de horario
   - Fuera de horario
   - Cambios de zona horaria

### Pruebas de Integración
1. Generación de enlaces:
   - Desde cualquier página de la aplicación

### Pruebas de Usuario
1. Usabilidad:
   - Visibilidad del botón
   - Facilidad de acceso
   - Claridad del mensaje predeterminado

2. Compatibilidad:
   - WhatsApp Web
   - Aplicación móvil
   - Diferentes navegadores