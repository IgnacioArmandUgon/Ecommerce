import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import React from 'react';
import { ShopLayout } from '../../components/layouts';
import { initialData } from '../../database/products';

const product = initialData.products[1];

const ProductPage = () => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}></Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection={'column'}>
            <Typography variant='h1' component={'h1'}>
              {product.title}
            </Typography>
            <Typography variant='subtitle1' component={'h1'}>
              ${product.price}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
            </Box>

            <Button color='secondary' className='circular-btn'>
              Agregar al carrito
            </Button>

            <Chip
              label='No hay disponibles'
              color='error'
              variant='outlined'
              sx={{ mt: 1 }}
            />

            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='subtitle2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};
export default ProductPage;
