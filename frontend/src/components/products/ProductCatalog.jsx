import { useState, useEffect } from 'react';
import { Container, Box, CircularProgress } from '@mui/material';
import ProductGrid from './ProductGrid';
import CategoryNavigation from './CategoryNavigation';
import Pagination from './Pagination';

const ProductCatalog = () => {
  // Estados para manejar los productos y la paginación
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Función para cargar los productos
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      // Construimos la URL con los parámetros de paginación y categoría
      const url = new URL('/api/products', window.location.origin);
      url.searchParams.append('page', currentPage);
      if (selectedCategory) {
        url.searchParams.append('category', selectedCategory);
      }

      const response = await fetch(url);
      const data = await response.json();

      setProducts(data.items);
      setTotalPages(data.pages);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setIsLoading(false);
    }
  };

  // Función para cargar las categorías
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  // Efecto para cargar las categorías al montar el componente
  useEffect(() => {
    fetchCategories();
  }, []);

  // Efecto para cargar los productos cuando cambia la página o la categoría
  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory]);

  // Manejador para cambio de categoría
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Volvemos a la primera página al cambiar de categoría
  };

  // Manejador para cambio de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Container maxWidth="lg">
      {/* Navegación de categorías */}
      <CategoryNavigation
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategoryChange}
      />

      {/* Loader o Grid de productos */}
      {isLoading ? (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '400px'
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <ProductGrid products={products} />
      )}

      {/* Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default ProductCatalog;