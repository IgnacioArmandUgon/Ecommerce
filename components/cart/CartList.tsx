import React from 'react';
import { initialData } from '../../database/products';
import {
  Grid,
  Typography,
  Link,
  CardActionArea,
  CardMedia,
  Box,
  Button,
} from '@mui/material';
import NextLink from 'next/link';
import { ProductCounter } from '../ui';
const cartProducts = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];
export const CartList = () => {
  return (
    <>
      {cartProducts.map((product) => (
        <Grid container spacing={2} sx={{ mb: 1 }} key={product.slug}>
          <Grid xs={3}>
            <NextLink href='/product/slug'>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`products/${product.images[0]}`}
                    component='img'
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid xs={7}>
            <Box display={'flex'} flexDirection='column'>
              <Typography variant='body1'>{product.title}</Typography>
              <Typography variant='body1'>Talla M</Typography>

              <ProductCounter />
            </Box>
          </Grid>
          <Grid xs={2} display='flex' alignItems={'center'} flexDirection={'column'}>
            <Typography>${product.price}</Typography>
            <Button variant='text' color='secondary'>
              Remover
            </Button>
          </Grid>
        </Grid>
      ))}
    </>
  );
};
