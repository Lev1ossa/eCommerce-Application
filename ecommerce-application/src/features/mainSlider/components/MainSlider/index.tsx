import { NavLink } from 'react-router-dom';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './MainSlider.module.scss';
import { sliderContent } from '../../constants/constants';

export function MainSlider(): React.ReactElement {
  const images = sliderContent.map(
    (slide) => new URL(`../../assets/${slide.img}`, import.meta.url).href,
  );
  return (
    <Swiper
      className={styles.swiper}
      centeredSlides
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      loop
      modules={[Autoplay]}
    >
      {sliderContent.map((slide, i) => (
        <SwiperSlide key={slide.title}>
          <section className={styles.section_main}>
            <div className={styles.main_text_block}>
              <p className={styles.text_bold}>{slide.title}</p>
              <p className={styles.text_normal}>{slide.subtitle}</p>
              <p className={styles.text_small}>{slide.text}</p>
              <NavLink className={styles.link} to="/catalog">
                Start Shopping
              </NavLink>
            </div>
            <div className={styles.circle_container}>
              <div className={styles.circle} />
              <img
                className={styles.fruit_image}
                src={images[i]}
                alt="fruit_image"
              />
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
