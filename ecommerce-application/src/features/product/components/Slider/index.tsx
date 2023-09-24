import { Dispatch, SetStateAction, useState } from 'react';
import SwiperCore from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Image } from '@commercetools/platform-sdk';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import styles from './Slider.module.scss';

export function Slider(props: {
  setActive: Dispatch<SetStateAction<boolean>>;
  images: Image[] | undefined;
}): React.ReactElement {
  const { images, setActive } = props;
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

  return (
    <>
      <Swiper
        loop
        spaceBetween={10}
        navigation
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`${styles.swiper_top} ${styles.swiper}`}
      >
        {images &&
          images.map((image) => (
            <SwiperSlide className={styles.swiper_slide} key={image.url}>
              <img
                className={`${styles.img} ${styles.top_img}`}
                aria-hidden
                onClick={(): void => setActive(true)}
                src={image.url}
                alt="test"
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        centerInsufficientSlides
        spaceBetween={10}
        slidesPerView={5}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`${styles.swiper} ${styles.swiper_bottom}`}
      >
        {images &&
          images.map((image) => (
            <SwiperSlide className={styles.bottom_slide} key={image.url}>
              <img
                className={styles.img}
                aria-hidden
                src={image.url}
                alt="test"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
