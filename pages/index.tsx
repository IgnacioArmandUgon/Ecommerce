import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products';
import FullScreenLoading from '../components/ui/FullScreenLoading';
import { useProducts } from '../hooks/useProducts';

const Home: NextPage = () => {
  const { products, isLoading, isError } = useProducts('products');

  return (
    <ShopLayout
      title='Ecommerce'
      pageDescription='Pagina de venta de productos de calidad'
    >
      <Typography variant='h1' component='h1'>
        Tienda
      </Typography>
      <Typography variant='h2' component='h2'>
        Todos los productos
      </Typography>

      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <ProductList products={products as any} />
      )}
    </ShopLayout>
  );
};

export default Home;
