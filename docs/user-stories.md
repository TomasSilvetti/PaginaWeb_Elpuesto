# Historias de Usuario - El Puesto MVP

## Slice: Productos

### HU-001: Ver Catálogo de Productos
**Como** cliente del supermercado  
**Quiero** ver una lista de productos disponibles  
**Para** poder conocer qué productos puedo comprar y sus precios

### HU-002: Ver Detalles de Producto
**Como** cliente del supermercado  
**Quiero** ver los detalles completos de un producto  
**Para** poder conocer su descripción, precio y disponibilidad

### HU-003: Buscar Productos
**Como** cliente del supermercado  
**Quiero** poder buscar productos por nombre  
**Para** encontrar rápidamente lo que necesito

## Slice: Carrito

### HU-004: Agregar al Carrito
**Como** cliente del supermercado  
**Quiero** poder agregar productos a mi carrito de compras  
**Para** ir acumulando los productos que deseo comprar

### HU-005: Ver Carrito
**Como** cliente del supermercado  
**Quiero** ver el contenido de mi carrito de compras  
**Para** revisar los productos que he seleccionado y el total a pagar

### HU-006: Modificar Cantidades
**Como** cliente del supermercado  
**Quiero** poder modificar la cantidad de cada producto en mi carrito  
**Para** ajustar mi compra según mis necesidades

### HU-007: Eliminar del Carrito
**Como** cliente del supermercado  
**Quiero** poder eliminar productos de mi carrito  
**Para** no comprar productos que ya no deseo

## Slice: Órdenes

### HU-008: Crear Orden
**Como** cliente del supermercado  
**Quiero** poder convertir mi carrito en una orden de compra  
**Para** finalizar mi proceso de compra

### HU-009: Ver Resumen de Orden
**Como** cliente del supermercado  
**Quiero** ver un resumen de mi orden antes de confirmarla  
**Para** asegurarme de que todo está correcto

### HU-010: Información de Envío
**Como** cliente del supermercado  
**Quiero** poder ingresar mi dirección de envío  
**Para** recibir mis productos en la ubicación correcta

### HU-011: Selección de Método de Pago
**Como** cliente del supermercado  
**Quiero** poder seleccionar mi método de pago preferido  
**Para** completar los datos de mi compra

## Slice: Contacto

### HU-012: Formulario de Contacto
**Como** cliente del supermercado  
**Quiero** poder enviar un mensaje a través de un formulario de contacto  
**Para** hacer consultas o reportar problemas

### HU-013: Ver Información de Contacto
**Como** cliente del supermercado  
**Quiero** ver la información de contacto del supermercado  
**Para** poder comunicarme por otros medios si lo necesito

## Slice: Autenticación

### HU-014: Registro de Usuario
**Como** visitante del supermercado  
**Quiero** poder crear una cuenta de usuario  
**Para** tener acceso a funcionalidades personalizadas y seguimiento de mis pedidos

### HU-015: Inicio de Sesión
**Como** usuario registrado  
**Quiero** poder iniciar sesión en mi cuenta  
**Para** acceder a mis datos personales y historial de compras

### HU-016: Recuperación de Contraseña
**Como** usuario registrado  
**Quiero** poder recuperar mi contraseña si la olvido  
**Para** no perder acceso a mi cuenta

---

## Priorización para MVP
Para la primera versión del MVP, sugiero enfocarnos en las siguientes historias de usuario críticas:

### Prioridad Alta (MVP)
1. HU-P1: Ver Catálogo de Productos
2. HU-P2: Ver Detalles de Producto
3. HU-C1: Agregar al Carrito
4. HU-C2: Ver Carrito
5. HU-O1: Crear Orden
6. HU-O4: Selección de Método de Pago
7. HU-CT2: Ver Información de Contacto

### Prioridad Media (Post-MVP inmediato)
1. HU-C3: Modificar Cantidades
2. HU-C4: Eliminar del Carrito
3. HU-O2: Ver Resumen de Orden
4. HU-P3: Buscar Productos
5. HU-A1: Registro de Usuario
6. HU-A2: Inicio de Sesión

### Prioridad Baja (Futuras iteraciones)
1. HU-CT1: Formulario de Contacto
2. HU-O3: Información de Envío
3. HU-A3: Recuperación de Contraseña

---

# Contexto Adicional del Negocio

## Tipos de Productos y Cálculo de Precios

### Tipos de Venta
1. **Por Unidad**
   - Productos que se venden por unidad (ej: latas, botellas)
   - Cálculo: cantidad × precio_unitario
   - Ejemplo: 3 latas × $100 = $300

2. **Por Peso**
   - Productos que se venden por peso (ej: carne, queso)
   - Cálculo: (peso_en_gramos / 1000) × precio_por_kilo
   - Ejemplo: (500g / 1000) × $2000 = $1000

3. **Mixtos (Ambos)**
   - Productos que pueden venderse de ambas formas (ej: frutas)
   - El cliente elige si compra por unidad o por peso
   - Ejemplo: Manzanas
     * Por unidad: 6 manzanas × $50 = $300
     * Por peso: (800g / 1000) × $600 = $480

### Restricciones de Negocio
1. **Para Productos por Peso (ej: carne, verduras)**
   - Debe especificarse un peso mínimo de venta
   - El precio se muestra por kilo
   - No requieren control de stock
   - Se pueden vender cantidades ilimitadas

2. **Para Productos por Unidad (ej: latas, botellas)**
   - La cantidad debe ser un número entero
   - El precio se muestra por unidad
   - Requieren control de stock
   - No se pueden vender más unidades que el stock disponible

3. **Para Productos Mixtos (ej: frutas)**
   - Deben configurarse ambos precios
   - El cliente debe poder elegir el modo de compra
   - Si se vende por unidad, se controla el stock
   - Si se vende por peso, no se controla el stock