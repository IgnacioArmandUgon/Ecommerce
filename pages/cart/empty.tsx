import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import NextLink from 'next/link';

const EmptyCartPage = () => {
  return (
    <ShopLayout
      title='Carrito vacío'
      pageDescription='No hay articulos en el carrito'
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 220px)'
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100, color: 'gray' }} />
        <Box display={'flex'} flexDirection='column' alignItems={'center'}>
          <Typography marginLeft={3}>Su carrito está vacío</Typography>
          <NextLink href={'/'} passHref>
            <Link typography='h4' color='secondary'>
              Regresar
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyCartPage;
