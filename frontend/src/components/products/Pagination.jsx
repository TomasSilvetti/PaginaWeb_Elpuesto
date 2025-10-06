import { Box, Pagination as MuiPagination } from '@mui/material';
import PropTypes from 'prop-types';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  // Manejador del cambio de página
  const handleChange = (event, value) => {
    onPageChange(value);
    // Scroll suave hacia arriba cuando cambiamos de página
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Solo mostramos la paginación si hay más de una página
  if (totalPages <= 1) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 4,
        mb: 4
      }}
    >
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
        sx={{
          '& .MuiPaginationItem-root': {
            '&.Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            },
            '&:hover': {
              backgroundColor: 'primary.light',
            },
          },
        }}
      />
    </Box>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;