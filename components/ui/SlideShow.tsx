import React, { FC } from 'react';
import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import styles from './SlideShow.module.css';

interface Props {
  images: string[];
}

export const SlidesShow: FC<Props> = ({ images }) => {
  return (
    <Slide easing='ease' duration={7000}>
      {images.map((img, index) => {
        const url = `/products/${img}`;
        return (
          <div className={styles['each-slide']} key={index}>
            <div style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover' }}>
              {' '}
            </div>
          </div>
        );
      })}
    </Slide>
  );
};
