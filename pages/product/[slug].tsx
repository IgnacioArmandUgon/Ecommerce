import React, { useContext, useState } from 'react';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';
import { ProductCounter, SizeSelector, SlidesShow } from '../../components/ui';
import { dbProducts } from '../../database';
import { ICartProduct, IProduct, ISize } from '../../interfaces';
import { CartContext } from '../../context';

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext);
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    tags: product.tags,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const updateProductSize = (size: ISize) => {
    setTempCartProduct({
      ...tempCartProduct,
      size: size === tempCartProduct.size ? undefined : size,
    });
  };
  const updateProductQuantity = (quantity: number) => {
    if (quantity > 0 && quantity <= product.inStock)
      setTempCartProduct({
        ...tempCartProduct,
        quantity,
      });
  };

  const onAddProduct = () => {
    if (!tempCartProduct) return;
    addProductToCart(tempCartProduct);
  };

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
              <ProductCounter
                quantity={tempCartProduct.quantity}
                onChangeQuantity={updateProductQuantity}
              />
              <SizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onChangeSize={updateProductSize}
              />
            </Box>
            {product.inStock > 0 ? (
              <Button
                color='secondary'
                className='circular-btn'
                disabled={!tempCartProduct.size}
                onClick={() => onAddProduct()}
              >
                {tempCartProduct.size ? 'Agregar al carrito' : 'Seleccione una talla'}
              </Button>
            ) : (
              <Chip
                label='No hay disponibles'
                color='error'
                variant='outlined'
                sx={{ mt: 1 }}
              />
            )}

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
//Es mas recomendable usar SSG

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
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;
