import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { ShopLayout } from '../components/layouts';

const Home: NextPage = () => {
  return (
    <ShopLayout title='Ecommerce' pageDescription='Esta es la pagina'>
      <Typography variant='h1' component={'h1'}>
        Tienda
      </Typography>
      <Typography variant='h2' component={'h2'}>
        Todos los productos
      </Typography>
    </ShopLayout>
  );
};

export default Home;
