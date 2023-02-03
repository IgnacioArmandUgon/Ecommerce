import React from 'react';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import FullScreenLoading from '../../components/ui/FullScreenLoading';
import { useProducts } from '../../hooks/useProducts';

const WomenPage = () => {
  const { products, isLoading } = useProducts('products?gender=women');
  return (
    <ShopLayout
      title='Mujeres'
      pageDescription='Pagina de venta de productos de mujeres'
    >
      <Typography variant='h1' component='h1'>
        Tienda
      </Typography>
      <Typography variant='h2' component='h2'>
        Mujeres
      </Typography>

      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <ProductList products={products as any} />
      )}
    </ShopLayout>
  );
};

export default WomenPage;
