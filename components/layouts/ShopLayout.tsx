import Head from 'next/head';
import { FC } from 'react';
import { SideMenu } from '../ui';
import Navbar from '../ui/Navbar';

interface Props {
  title: string;
  pageDescription: string;
  imgFullUrl?: string;
}

export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imgFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        {/* Para una mejor representación en redes sociales */}
        <meta name='description' content={pageDescription} />
        <meta name='og:description' content={title} />
        <meta name='og:title' content={pageDescription} />
        {imgFullUrl ? <meta name='og:image' content={imgFullUrl} /> : null}
      </Head>

      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main
        style={{
          margin: '120px auto',
          maxWidth: '1440px',
          padding: '0px 20px',
        }}
      >
        {children}
      </main>
      <footer></footer>
    </>
  );
};
