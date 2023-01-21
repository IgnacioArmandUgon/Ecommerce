import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import NextLink from 'next/link';
const SummaryPage = () => {
  return (
    <ShopLayout title='Resumen de compra' pageDescription='Resumen de la compra'>
      <Typography variant='h1' component={'h1'}>
        Resumen de la compra
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable={false} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Orden</Typography>

              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='h2'>Dirección de entrega</Typography>
                <NextLink href='/checkout/address'>
                  <Link underline='always' sx={{ cursor: 'pointer' }}>
                    Editar
                  </Link>
                </NextLink>
              </Box>

              <Typography>Nacho</Typography>
              <Typography>omg waaaaaaaaaaa</Typography>
              <Typography>carlos a lopez 3471</Typography>
              <Typography>12300</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display='flex' justifyContent='end'>
                <NextLink href='/checkout/address'>
                  <Link underline='always' sx={{ cursor: 'pointer' }}>
                    Editar
                  </Link>
                </NextLink>
              </Box>
              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color='secondary' className='circular-btn' fullWidth>
                  Confirmar orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
