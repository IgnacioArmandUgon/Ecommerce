import React from 'react';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import FullScreenLoading from '../../components/ui/FullScreenLoading';
import { useProducts } from '../../hooks/useProducts';

const MenPage = () => {
  const { products, isLoading, isError } = useProducts('products?gender=men');
  console.log({ isError });
  console.log({ products });
  return (
    <ShopLayout
      title='Hombres'
      pageDescription='Pagina de venta de productos de hombres'
    >
      <Typography variant='h1' component='h1'>
        Tienda
      </Typography>
      <Typography variant='h2' component='h2'>
        Hombres
      </Typography>

      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <ProductList products={products as any} />
      )}
    </ShopLayout>
  );
};

export default MenPage;
