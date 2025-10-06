import { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  // Estado para controlar si se muestran los controles de cantidad
  const [showQuantityControls, setShowQuantityControls] = useState(false);
  // Estado para almacenar la cantidad seleccionada
  const [quantity, setQuantity] = useState(product.saleType === 'PESABLE' ? 500 : 1);
  // Estado para el tipo de venta en productos mixtos
  const [saleType, setSaleType] = useState('PESABLE');

  // Función para manejar el click en "Agregar al Carrito"
  const handleAddToCart = () => {
    setShowQuantityControls(true);
  };

  // Función para actualizar la cantidad
  const handleQuantityChange = (delta) => {
    if (product.saleType === 'PESABLE' || (product.saleType === 'MIXTO' && saleType === 'PESABLE')) {
      // Para productos por peso, cambiamos de 100 en 100 gramos
      const newQuantity = Math.max(100, quantity + delta * 100);
      setQuantity(newQuantity);
    } else {
      // Para productos por unidad, cambiamos de 1 en 1
      const newQuantity = Math.max(1, quantity + delta);
      setQuantity(newQuantity);
    }
  };

  // Función para formatear el precio según el tipo de venta
  const formatPrice = () => {
    if (product.saleType === 'UNIDAD') {
      return `$${product.unitPrice}/unidad`;
    }
    if (product.saleType === 'PESABLE') {
      return `$${product.weightPrice}/kg`;
    }
    return `$${product.weightPrice}/kg`;
  };

  // Función para formatear la cantidad según el tipo de venta
  const formatQuantity = () => {
    if (product.saleType === 'PESABLE' || (product.saleType === 'MIXTO' && saleType === 'PESABLE')) {
      return `${quantity}g`;
    }
    return quantity;
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h6" component="h2">
          {product.name}
        </Typography>
        <Typography variant="body1" color="primary" gutterBottom>
          {formatPrice()}
        </Typography>

        {!showQuantityControls ? (
          <Button
            variant="contained"
            fullWidth
            onClick={handleAddToCart}
            sx={{
              mt: 'auto',
              backgroundColor: 'warning.main',
              color: 'black',
              '&:hover': {
                backgroundColor: 'warning.dark',
              },
            }}
          >
            Agregar al Carrito
          </Button>
        ) : (
          <>
            <Box
              sx={{
                display: 'flex',
                backgroundColor: 'warning.main',
                borderRadius: 1,
                mt: 'auto',
                mb: product.saleType === 'MIXTO' ? 1 : 0,
              }}
            >
              <Button
                onClick={() => handleQuantityChange(-1)}
                sx={{ color: 'black', flexGrow: 0 }}
              >
                -
              </Button>
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'black',
                }}
              >
                {formatQuantity()}
              </Box>
              <Button
                onClick={() => handleQuantityChange(1)}
                sx={{ color: 'black', flexGrow: 0 }}
              >
                +
              </Button>
            </Box>

            {product.saleType === 'MIXTO' && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <Typography variant="body2">Por peso</Typography>
                <Box
                  sx={{
                    width: 60,
                    height: 34,
                    bgcolor: saleType === 'PESABLE' ? 'warning.main' : 'grey.300',
                    borderRadius: 17,
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSaleType(saleType === 'PESABLE' ? 'UNIDAD' : 'PESABLE')}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 4,
                      left: saleType === 'PESABLE' ? 4 : 30,
                      width: 26,
                      height: 26,
                      bgcolor: 'white',
                      borderRadius: '50%',
                      transition: 'left 0.2s',
                    }}
                  />
                </Box>
                <Typography variant="body2">Por unidad</Typography>
              </Box>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    saleType: PropTypes.oneOf(['UNIDAD', 'PESABLE', 'MIXTO']).isRequired,
    unitPrice: PropTypes.number,
    weightPrice: PropTypes.number,
  }).isRequired,
};

export default ProductCard;