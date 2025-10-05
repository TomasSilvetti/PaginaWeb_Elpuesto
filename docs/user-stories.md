# Historias de Usuario - El Puesto MVP

## Slice 1

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

## Slice 2

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

## Slice 3

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

## Slice 4

### HU-013: Ver Información de Contacto
**Como** cliente del supermercado  
**Quiero** ver la información de contacto del supermercado  
**Para** poder comunicarme por WhatsApp si tengo consultas o problemas con mi pedido

// Nota: La HU-012 (Formulario de Contacto) se ha movido a implementaciones futuras ya que inicialmente 
// el contacto se manejará exclusivamente vía WhatsApp

## Slice 5

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



# Reglas del negocio

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

3. **Mixtos**
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
   - Internamente se tratan como productos por peso
   - El precio final siempre se calcula por peso real
   - No requieren control de stock
   - Se pueden vender cantidades ilimitadas