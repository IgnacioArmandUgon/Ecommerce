import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import { ShopLayout } from '../../components/layouts';
import { ProductCounter, SizeSelector, SlidesShow } from '../../components/ui';
import { dbProducts } from '../../database';
import { getProductBySlug } from '../../database/dbProducts';
import { IProduct } from '../../interfaces';

interface Props {
  product: IProduct;
}

// const product = initialData.products[1];
const ProductPage: NextPage<Props> = ({ product }) => {
  // const router = useRouter();
  // const { products: product, isLoading } = useProducts(
  //   `/products/${router.query.slug}`
  // );
  //Malo para SEO, la información no se carga automaticamente
  return (
    <ShopLayout title={product?.title} pageDescription={product?.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <SlidesShow images={product.images} />
        </Grid>
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
              <ProductCounter />
              <SizeSelector selectedSize='S' sizes={product.sizes} />
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

//Esta función es de server-side rendering, y se ejecuta en cada petición
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { slug } = ctx.params as { slug: string };
//   const product = await dbProducts.getProductBySlug(slug);
//   console.log({ product });
//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false, //El error es permanente y nunca se tiene que volver a indexar esta pagina? NO
//       },
//     };
//   }
//   return { props: { product } };
// };
//
//Es mas recomendable usar SSR

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };

  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false, //El error es permanente y nunca se tiene que volver a indexar esta pagina? NO
      },
    };
  }
  return {
    props: { product },
    revalidate: 24,
  };
};

export default ProductPage;
