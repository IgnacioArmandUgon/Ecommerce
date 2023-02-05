import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { AppBar, Toolbar, Link, Typography, Box } from '@mui/material';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

//NextLink de antemano empieza a hacer el prefetch de la otra pagina
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { UiContext } from '../../context';

const Navbar = () => {
  const router = useRouter();
  const url = router.pathname;

  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href={'/'} passHref>
          <Link display={'flex'} alignItems='center'>
            <Typography variant='h6'>Ecommerce | </Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NextLink href={'/category/men'} passHref>
            <Link>
              <Button color={url === '/category/men' ? 'primary' : 'info'}>
                Men
              </Button>
            </Link>
          </NextLink>
          <NextLink href={'/category/women'} passHref>
            <Link>
              <Button color={url === '/category/women' ? 'primary' : 'info'}>
                Women
              </Button>
            </Link>
          </NextLink>
          <NextLink href={'/category/kids'} passHref>
            <Link>
              <Button color={url === '/category/kids' ? 'primary' : 'info'}>
                Kids
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        <IconButton>
          <SearchOutlined />
        </IconButton>

        <NextLink href={'/cart'} passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={2} color='secondary'>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={() => toggleSideMenu()}>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
