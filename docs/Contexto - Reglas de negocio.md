
# Contexto y Reglas de Negocio

## Restricciones de Negocio

### 1. Productos por Peso (ej: carne, verduras)
- Debe especificarse un peso mínimo de venta
- El precio se muestra por kilo
- No requieren control de stock
- Se pueden vender cantidades ilimitadas

### 2. Productos por Unidad (ej: latas, botellas)
- La cantidad debe ser un número entero
- El precio se muestra por unidad
- Requieren control de stock
- No se pueden vender más unidades que el stock disponible

### 3. Productos Mixtos (ej: frutas)
- Deben configurarse ambos precios
- El cliente debe poder elegir el modo de compra
- Internamente se tratan como productos por peso
- El precio final siempre se calcula por peso real
- No requieren control de stock
- Se pueden vender cantidades ilimitadas

## Decisiones Técnicas

### Base de Datos
- Sistema: PostgreSQL usaremos SQLAlchemy
- Estado: Pendiente de implementación local
- Datos de prueba: Pendientes de crear

### Almacenamiento de Imágenes
- Ubicación: Local (filesystem)
- Formato recomendado: WebP con fallback a JPEG
- Resolución máxima: 800x800 pixels
- Peso máximo: 200KB

### Frontend
- Framework: React + Vite
- Biblioteca UI: Material-UI (MUI)
- Lenguaje: JavaScript
- Estado: Inicializado y configurado

### Backend
- Framework: FastAPI
- Estado: Inicializado y configurado
- Dependencias principales instaladas

### Paginación
- Productos por página: 20
- Funcionalidades:
  - Navegación entre páginas
  - Indicador de página actual
  - Total de páginas disponibles
- Implementación en API:
  ```python
  @app.get("/api/products")
  async def get_products(
      page: int = 1,
      items_per_page: int = 20,
      category_id: Optional[str] = None
  )
  ```

## Guía de Estilo

### Paleta de Colores
- Principal: `#134686` (Azul)
- Secundario: `#ED3F27` (Rojo)
- Terciario: `#FEB21A` (Amarillo)
- Detalles: `#FDF4E3` (Beige claro)

### Diseño Visual
- Enfoque: Diseño iterativo con mockups simples
- Metodología: Ajustes sobre la marcha según feedback
- Prioridad: Funcionalidad sobre estética en fase MVP



