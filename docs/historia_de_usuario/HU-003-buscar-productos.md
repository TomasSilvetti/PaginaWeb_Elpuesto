# Historia de Usuario: Buscar Productos (HU-003)

## Descripción
**Como** cliente del supermercado  
**Quiero** poder buscar productos por nombre  
**Para** encontrar rápidamente lo que necesito

## Criterios de Aceptación

### 1. Barra de Búsqueda
- La barra de búsqueda debe estar visible y accesible en todo momento
- Debe tener un placeholder indicando "Buscar productos..."
- Debe tener un ícono de lupa minimalista para indicar la función
- Debe tener un botón de limpiar (X) cuando hay texto

### 2. Funcionalidad de Búsqueda
- La búsqueda debe iniciarse:
  - Al presionar Enter
- La búsqueda debe ser insensible a mayúsculas/minúsculas
- Debe buscar coincidencias parciales en el nombre del producto
- Debe mantener los filtros de categoría activos durante la búsqueda

### 3. Resultados de Búsqueda
- Mostrar los productos en el mismo formato que el catálogo
- Indicar la cantidad de resultados encontrados
- Mostrar un mensaje cuando no hay resultados
- Mantener la paginación (20 productos por página)
- Ordenar resultados por relevancia:
  - Coincidencias exactas primero
  - Coincidencias al inicio del nombre después
  - Coincidencias parciales al final

### 4. Rendimiento y UX
- El tiempo de respuesta debe ser menor a 1 segundo
- Debe mostrar un indicador de carga mientras busca
- Debe mantener el término de búsqueda visible
- Debe preservar el término de búsqueda al navegar entre páginas

## Detalles Técnicos

### Frontend (React + Vite)
1. Componentes Necesarios:
   ```typescript
   // Componentes
   SearchBar.tsx
   SearchResults.tsx
   SearchStatus.tsx    // Para mostrar cantidad de resultados/mensajes
   LoadingSpinner.tsx
   ```

2. Estado Global (Redux/Context):
   ```typescript
   interface SearchState {
     searchTerm: string;
     isSearching: boolean;
     resultsCount: number;
     currentPage: number;
     category?: string;
   }

   interface SearchFilters {
     searchTerm: string;
     categoryId?: string;
     page: number;
     pageSize: number;
   }
   ```

### Backend (FastAPI)
1. Endpoints Necesarios:
   ```python
   # Búsqueda de Productos
   GET /api/products/search
   Parameters:
     - q: string          # término de búsqueda
     - category_id?: UUID # categoría opcional
     - page: int         # número de página
     - page_size: int    # elementos por página
   Response: {
     items: Product[],
     total: int,
     page: int,
     pages: int
   }
   ```

2. Queries SQL:
   ```sql
   -- Búsqueda de productos
   SELECT 
     p.*,
     c.name as category_name,
     ts_rank_cd(
       to_tsvector('spanish', p.name),
       plainto_tsquery('spanish', :search_term)
     ) as relevance
   FROM products p
   JOIN categories c ON p.category_id = c.id
   WHERE p.is_active = true
   AND (
     -- Búsqueda por texto usando índice de texto completo
     to_tsvector('spanish', p.name) @@ plainto_tsquery('spanish', :search_term)
     -- Búsqueda por LIKE para coincidencias parciales
     OR LOWER(p.name) LIKE LOWER(:search_pattern)
   )
   AND (:category_id IS NULL OR p.category_id = :category_id)
   ORDER BY
     -- Coincidencias exactas primero
     CASE WHEN LOWER(p.name) = LOWER(:search_term) THEN 0
          WHEN LOWER(p.name) LIKE LOWER(:search_term || '%') THEN 1
          ELSE 2
     END,
     relevance DESC,
     p.name
   LIMIT :limit OFFSET :offset;
   ```

### Índices Necesarios
```sql
-- Índice para búsqueda de texto completo
CREATE INDEX idx_products_name_fts ON products USING gin(to_tsvector('spanish', name));

-- Índice para búsquedas LIKE
CREATE INDEX idx_products_name_lower ON products(LOWER(name));
```

## Dependencias
- Base de datos configurada con tablas PRODUCTS y CATEGORIES
- Índices de búsqueda creados en la base de datos
- Historia de usuario HU-001 (Ver Catálogo de Productos) implementada

## Consideraciones Adicionales
1. Optimización de Búsqueda:
   - Utilizar caché para términos de búsqueda frecuentes
   - Usar índices de texto completo para mejor rendimiento

2. UX/UI:
   - Mantener historial de búsquedas recientes
   - Sugerir términos mientras el usuario escribe
   - Mantener consistencia visual con el catálogo