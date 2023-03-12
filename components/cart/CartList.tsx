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
import { ICartProduct } from '../../interfaces';

interface Props {
  editable: boolean;
}
export const CartList: FC<Props> = ({ editable }) => {
  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

  const onChangeQuantity = (product: ICartProduct, quantity: number) => {
    if (quantity > 0 && quantity <= 10) {
      product.quantity = quantity;
      updateCartQuantity(product);
    }
  };
  console.log({ cart });
  return (
    <>
      {cart.map((product) => (
        <Grid container spacing={2} sx={{ mt: 2 }} key={product.slug + product.size}>
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
                <ProductCounter
                  quantity={product.quantity}
                  onChangeQuantity={(value) => {
                    onChangeQuantity(product, value);
                  }}
                />
              ) : (
                <Typography variant='h5'>
                  {product.quantity} producto{product.quantity > 1 && 's'}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid xs={2} item display='flex' alignItems={'center'} flexDirection={'column'}>
            <Typography variant='h5'>${product.price}</Typography>
            {editable && (
              <Button
                variant='text'
                color='secondary'
                onClick={() => removeCartProduct(product)}
              >
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
