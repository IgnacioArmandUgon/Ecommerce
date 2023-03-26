import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import {
  AppBar,
  Toolbar,
  Link,
  Typography,
  Box,
  Input,
  InputAdornment,
} from '@mui/material';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

//NextLink de antemano empieza a hacer el prefetch de la otra pagina
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { CartContext, UiContext } from '../../context';

const Navbar = () => {
  const router = useRouter();
  const url = router.pathname;

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { toggleSideMenu } = useContext(UiContext);
  const { numberOfItems } = useContext(CartContext);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;

    router.push(`/search/${searchTerm}`);
  };

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
        <Box
          sx={{ display: isSearching ? 'none' : { xs: 'none', sm: 'block' } }}
          className='fadeIn'
        >
          <NextLink href={'/category/men'} passHref>
            <Link>
              <Button color={url === '/category/men' ? 'primary' : 'info'}>Men</Button>
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
              <Button color={url === '/category/kids' ? 'primary' : 'info'}>Kids</Button>
            </Link>
          </NextLink>
        </Box>
        <Box flex={1} />
        {/* DEV */}

        {isSearching ? (
          <Input
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            className='fadeIn'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type='text'
            onKeyPress={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
            placeholder='Buscar...'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => onSearchTerm()}
                >
                  <ClearOutlined onClick={() => setIsSearching(false)} />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            onClick={() => setIsSearching(true)}
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* MOBILE */}
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={() => toggleSideMenu()}
        >
          <SearchOutlined />
        </IconButton>
        <NextLink href={'/cart'} passHref>
          <Link>
            <IconButton>
              <Badge
                badgeContent={numberOfItems > 9 ? '+9' : numberOfItems}
                color='secondary'
              >
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
