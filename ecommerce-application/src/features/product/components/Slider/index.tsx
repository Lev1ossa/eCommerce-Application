import { Dispatch, SetStateAction, useState } from 'react';
import SwiperCore from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './styles.scss';

// eslint-disable-next-line max-lines-per-function
export function Slider(props: {
  setActive: Dispatch<SetStateAction<boolean>>;
}): React.ReactElement {
  const { setActive } = props;
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
        className="mySwiper2"
      >
        <SwiperSlide>
          <img
            aria-hidden
            onClick={(): void => setActive(true)}
            src="https://thumbs.dreamstime.com/b/green-apple-leaf-slice-isolated-white-ripe-background-clipping-path-45471482.jpg"
            alt="test"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            aria-hidden
            onClick={(): void => setActive(true)}
            src="https://thumbs.dreamstime.com/b/red-apple-isolated-clipping-path-19130134.jpg"
            alt="test"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            aria-hidden
            onClick={(): void => setActive(true)}
            src="https://thumbs.dreamstime.com/b/red-apple-leaf-slice-white-background-29914331.jpg"
            alt="test"
          />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        centerInsufficientSlides
        spaceBetween={10}
        slidesPerView={5}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            aria-hidden
            src="https://thumbs.dreamstime.com/b/green-apple-leaf-slice-isolated-white-ripe-background-clipping-path-45471482.jpg"
            alt="test"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            aria-hidden
            src="https://thumbs.dreamstime.com/b/red-apple-isolated-clipping-path-19130134.jpg"
            alt="test"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            aria-hidden
            src="https://thumbs.dreamstime.com/b/red-apple-leaf-slice-white-background-29914331.jpg"
            alt="test"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
