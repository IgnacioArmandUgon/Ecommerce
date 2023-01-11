import { Box, Typography } from '@mui/material';
import React from 'react';
import { ShopLayout } from '../components/layouts';

const Custom404 = () => {
  return (
    <ShopLayout title='Ecommerce' pageDescription='Page not found'>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 220px)'
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Typography variant='h1' component={'h1'} fontSize={80} fontWeight={100}>
          404 |
        </Typography>
        <Typography marginLeft={2}>No page was found here</Typography>
      </Box>
    </ShopLayout>
  );
};

export default Custom404;
