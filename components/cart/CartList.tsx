import React, { FC } from 'react';
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
import { borderRadius } from '@mui/system';
const cartProducts = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  editable: boolean;
}
export const CartList: FC<Props> = ({ editable }) => {
  return (
    <>
      {cartProducts.map((product) => (
        <Grid container spacing={2} sx={{ mt: 2 }} key={product.slug}>
          <Grid xs={3}>
            <NextLink href='/product/slug'>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images[0]}`}
                    component='img'
                    sx={{ borderRadius: '5px' }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid xs={7}>
            <Box display={'flex'} flexDirection='column' sx={{ ml: 2 }}>
              <Typography variant='body1'>{product.title}</Typography>
              <Typography variant='body1'>Talla M</Typography>
              {editable ? <ProductCounter /> : <Typography>3</Typography>}
            </Box>
          </Grid>
          <Grid xs={2} display='flex' alignItems={'center'} flexDirection={'column'}>
            <Typography>${product.price}</Typography>
            {editable && (
              <Button variant='text' color='secondary'>
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
