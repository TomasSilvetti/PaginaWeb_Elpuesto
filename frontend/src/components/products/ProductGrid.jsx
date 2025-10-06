import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  return (
    <Grid container spacing={3}>
      {products.map(product => (
        <Grid 
          item 
          key={product.id} 
          xs={6}     // En móviles: 2 productos por fila (12/6 = 2)
          md={3}     // En desktop: 4 productos por fila (12/3 = 4)
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      saleType: PropTypes.oneOf(['UNIDAD', 'PESABLE', 'MIXTO']).isRequired,
      unitPrice: PropTypes.number,
      weightPrice: PropTypes.number,
    })
  ).isRequired,
};

export default ProductGrid;