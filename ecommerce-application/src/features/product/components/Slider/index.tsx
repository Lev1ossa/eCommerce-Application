import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './Slider.module.scss';

export function Slider(): React.ReactElement {
  return (
    <>
      {/* <div className={styles.slider}> */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop
        pagination={{
          clickable: true,
        }}
        navigation
        modules={[Pagination, Navigation]}
        className={styles.swiper}
      >
        <SwiperSlide className={styles.swiper_slide}>
          <img
            src="https://thumbs.dreamstime.com/b/green-apple-leaf-slice-isolated-white-ripe-background-clipping-path-45471482.jpg"
            alt="test"
          />
        </SwiperSlide>
        <SwiperSlide className={styles.swiper_slide}>
          <img
            src="https://thumbs.dreamstime.com/b/red-apple-isolated-clipping-path-19130134.jpg"
            alt="test"
          />
        </SwiperSlide>
        <SwiperSlide className={styles.swiper_slide}>
          <img
            src="https://thumbs.dreamstime.com/b/red-apple-leaf-slice-white-background-29914331.jpg"
            alt="test"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
