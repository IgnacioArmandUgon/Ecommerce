import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { ShopLayout } from '../layouts';

const FullScreenLoading = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      height='calc(100vh - 220px)'
      sx={{
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      <Typography sx={{ mb: 3 }} fontSize={20}>
        Cargando...
      </Typography>
      <CircularProgress thickness={5} />
    </Box>
  );
};

export default FullScreenLoading;
