import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes';

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <AnyComponent {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
