# Historia de Usuario: Buscar Productos (HU-003)

## Descripción
**Como** cliente del supermercado  
**Quiero** poder buscar productos por nombre  
**Para** encontrar rápidamente lo que necesito

## Criterios de Aceptación

### Criterios de Aceptación

1. Dado que soy un cliente
   Cuando estoy en cualquier página del sitio
   Entonces veo:
   - Una barra de búsqueda accesible
   - Un placeholder "Buscar productos..."
   - Un ícono de lupa minimalista
   - Un botón (X) para limpiar cuando hay texto

2. Dado que quiero buscar un producto
   Cuando presiono Enter en la barra de búsqueda
   Entonces:
   - La búsqueda se ejecuta
   - No distingue entre mayúsculas y minúsculas
   - Encuentra coincidencias parciales
   - Mantiene los filtros de categoría activos

3. Dado que realicé una búsqueda
   Cuando recibo los resultados
   Entonces:
   - Veo los productos en formato de catálogo
   - Veo la cantidad de resultados encontrados
   - Si no hay resultados, veo un mensaje claro
   - Los resultados están paginados (20 por página)

4. Dado que hay múltiples resultados
   Cuando veo la lista
   Entonces están ordenados por relevancia:
   - Primero las coincidencias exactas
   - Luego coincidencias al inicio del nombre
   - Finalmente coincidencias parciales

5. Dado que estoy realizando una búsqueda
   Cuando espero los resultados
   Entonces:
   - La respuesta llega en menos de 1 segundo
   - Veo un indicador de carga
   - El término de búsqueda permanece visible
   - El término se mantiene al cambiar de página

## Detalles Técnicos

### Frontend (React + Vite)
1. Componentes Necesarios:
   ```typescript
   // Componentes
   SearchBar.jsx
   SearchResults.jsx
   SearchStatus.jsx    // Para mostrar cantidad de resultados/mensajes
   LoadingSpinner.jsx
   ```

2. Estado Global (Redux/Context):
   ```javascript
   // SearchState shape
   const initialSearchState = {
     searchTerm: '',
     isSearching: false,
     resultsCount: 0,
     currentPage: 1,
     category: null
   }

   // SearchFilters PropTypes
   SearchResults.propTypes = {
     searchTerm: PropTypes.string.isRequired,
     categoryId: PropTypes.string,
     page: PropTypes.number.isRequired,
     pageSize: PropTypes.number.isRequired
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