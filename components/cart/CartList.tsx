import React, { FC, useContext } from 'react';
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
import { CartContext } from '../../context';

interface Props {
  editable: boolean;
}
export const CartList: FC<Props> = ({ editable }) => {
  const { cart } = useContext(CartContext);
  console.log(cart);
  return (
    <>
      {cart.map((product) => (
        <Grid container spacing={2} sx={{ mt: 2 }} key={product.slug}>
          <Grid xs={3}>
            <NextLink href={`/product/${product.slug}`}>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
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
              <Typography variant='body1'>
                Talla <strong>{product.size}</strong>
              </Typography>
              {editable ? (
                <ProductCounter quantity={product.quantity} onChangeQuantity={() => {}} />
              ) : (
                <Typography variant='h5'>
                  {product.quantity} producto{product.quantity > 1 && 's'}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid xs={2} display='flex' alignItems={'center'} flexDirection={'column'}>
            <Typography variant='h5'>${product.price}</Typography>
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
