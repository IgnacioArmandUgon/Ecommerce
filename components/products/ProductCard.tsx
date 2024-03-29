import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Box,
  Typography,
  Link,
  Chip,
} from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import { IProduct } from '../../interfaces';
import NextLink from 'next/link';

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const productImage = useMemo(() => {
    return isHovered
      ? `/products/${product.images[1]}`
      : `/products/${product.images[0]}`;
  }, [isHovered, product.images]);
  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
          <Link>
            <CardActionArea>
              {product.inStock === 0 && (
                <Chip
                  color='primary'
                  label='No disponible'
                  sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
                />
              )}
              <CardMedia
                component={'img'}
                image={`/products/${product.images[isHovered ? 1 : 0]}`}
                alt={product.title}
                className='fadeIn'
                onLoad={() => setIsImgLoaded(true)}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box sx={{ mt: 1, display: isImgLoaded ? 'block' : 'none' }} className='fadeIn'>
        <Typography fontWeight={750}>{product.title}</Typography>
        <Typography fontWeight={500}>${product.price}</Typography>
      </Box>
    </Grid>
  );
};
