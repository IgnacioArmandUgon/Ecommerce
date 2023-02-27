import { Typography } from '@mui/material';
import type { GetServerSideProps, NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';

import { dbProducts } from '../../database';

import { IProduct } from '../../interfaces';

interface Props {
  products: IProduct[];
  areProducts: boolean;
  query: string;
}
const SearchPage: NextPage<Props> = ({ products, areProducts, query }) => {
  return (
    <ShopLayout title='Ecommerce' pageDescription='Pagina de venta de productos de calidad'>
      <Typography variant='h1' component='h1'>
        Buscar producto
      </Typography>
      <Typography variant='h2' component='h2'>
        {areProducts
          ? `Resultados de busqueda para '${query}'`
          : `No pudimos encontrar ningun producto, tal vez estos te gusten`}
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
  const areProducts = products.length > 0;

  if (!areProducts) {
    products = await dbProducts.getAllProducts();
  }

  return { props: { products, areProducts, query } };
};

export default SearchPage;
