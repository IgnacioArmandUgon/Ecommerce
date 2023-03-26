import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context';

const CartPage = () => {
  const { numberOfItems } = useContext(CartContext);
  return (
    <ShopLayout title={`Carrito - ${numberOfItems}`} pageDescription='Carrito de compra'>
      <Typography variant='h1' component={'h1'}>
        Carrito
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable={true} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>
                <OrderSummary />
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box sx={{ mt: 3 }}>
                <Button color='secondary' className='circular-btn' fullWidth>
                  Chechout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
