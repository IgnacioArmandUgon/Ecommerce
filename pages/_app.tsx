import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <ThemeProvider theme={}>
      <AnyComponent {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
