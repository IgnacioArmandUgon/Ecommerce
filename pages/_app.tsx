import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes';
import { SWRConfig } from 'swr';
import { UiProvider, CartProvider } from '../context';

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
      }}
    >
      <UiProvider>
        <CartProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <AnyComponent {...pageProps} />
          </ThemeProvider>
        </CartProvider>
      </UiProvider>
    </SWRConfig>
  );
}

export default MyApp;
