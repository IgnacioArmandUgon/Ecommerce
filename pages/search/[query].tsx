import { Typography } from '@mui/material';
import type { GetServerSideProps, NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';

import { dbProducts } from '../../database';

import { IProduct } from '../../interfaces';

interface Props {
  products: IProduct[];
}
const SearchPage: NextPage<Props> = ({ products }) => {
  return (
    <ShopLayout title='Ecommerce' pageDescription='Pagina de venta de productos de calidad'>
      <Typography variant='h1' component='h1'>
        Buscar producto
      </Typography>
      <Typography variant='h2' component='h2'>
        asdnasdnasd
      </Typography>

      <ProductList products={products} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProducsByTerms(query);

  return { props: { products } };
};

export default SearchPage;
