import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import React, { FC } from 'react';

interface Props {
  quantity: number;
  onChangeQuantity: (quantity: number) => void;
}

export const ProductCounter: FC<Props> = ({ quantity, onChangeQuantity }) => {
  return (
    <Box display={'flex'} alignItems='center'>
      <IconButton onClick={() => onChangeQuantity(quantity - 1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>{quantity}</Typography>
      <IconButton onClick={() => onChangeQuantity(quantity + 1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
