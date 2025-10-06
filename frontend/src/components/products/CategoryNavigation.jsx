import { Box, Chip, Paper, Typography, Breadcrumbs } from '@mui/material';
import PropTypes from 'prop-types';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const CategoryNavigation = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect,
  breadcrumbPath 
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      {/* Breadcrumb */}
      <Paper 
        sx={{ 
          p: 1.5, 
          mb: 2, 
          backgroundColor: 'background.beige',  // Color beige para el breadcrumb
        }}
      >
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Typography 
            color="primary" 
            sx={{ cursor: 'pointer' }}
            onClick={() => onCategorySelect(null)}
          >
            Inicio
          </Typography>
          <Typography 
            color="primary" 
            sx={{ cursor: 'pointer' }}
            onClick={() => onCategorySelect(null)}
          >
            Productos
          </Typography>
          {selectedCategory && (
            <Typography color="text.primary">
              {categories.find(cat => cat.id === selectedCategory)?.name || ''}
            </Typography>
          )}
        </Breadcrumbs>
      </Paper>

      {/* Categorías en chips scrollables */}
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 1, 
          overflowX: 'auto', 
          pb: 1,
          '&::-webkit-scrollbar': {
            height: 6,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'background.paper',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'primary.main',
            borderRadius: 3,
          },
        }}
      >
        <Chip
          label="Todas"
          onClick={() => onCategorySelect(null)}
          color={selectedCategory === null ? "primary" : "default"}
          sx={{
            backgroundColor: selectedCategory === null ? 'primary.main' : 'default',
            color: selectedCategory === null ? 'white' : 'inherit',
            '&:hover': {
              backgroundColor: selectedCategory === null ? 'primary.dark' : 'default',
            },
          }}
        />
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            onClick={() => onCategorySelect(category.id)}
            color={selectedCategory === category.id ? "primary" : "default"}
            sx={{
              backgroundColor: selectedCategory === category.id ? 'primary.main' : 'default',
              color: selectedCategory === category.id ? 'white' : 'inherit',
              '&:hover': {
                backgroundColor: selectedCategory === category.id ? 'primary.dark' : 'default',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

CategoryNavigation.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedCategory: PropTypes.string,
  onCategorySelect: PropTypes.func.isRequired,
  breadcrumbPath: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string,
    })
  ),
};

export default CategoryNavigation;