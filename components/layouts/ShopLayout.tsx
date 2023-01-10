import Head from 'next/head';
import { FC } from 'react';

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

      <nav></nav>

      <main
        style={{
          margin: '80px auto',
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
