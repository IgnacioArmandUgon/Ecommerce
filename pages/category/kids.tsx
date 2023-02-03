import React from 'react';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import FullScreenLoading from '../../components/ui/FullScreenLoading';
import { useProducts } from '../../hooks/useProducts';

const KidsPage = () => {
  const { products, isLoading } = useProducts('products?gender=kid');
  return (
    <ShopLayout
      title='Niños'
      pageDescription='Pagina de venta de productos de niños'
    >
      <Typography variant='h1' component='h1'>
        Tienda
      </Typography>
      <Typography variant='h2' component='h2'>
        Niños
      </Typography>

      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <ProductList products={products as any} />
      )}
    </ShopLayout>
  );
};

export default KidsPage;
