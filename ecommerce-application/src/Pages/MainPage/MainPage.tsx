import { Header } from '../../components/Header/Header';
import styles from './MainPage.module.scss';
import { Footer } from '../../components/Footer/Footer';

// eslint-disable-next-line max-lines-per-function
export function MainPage(): React.ReactElement {
  const promoCode1Url = new URL(
    '/src/assets/img/background_promo1.png',
    import.meta.url,
  ).href;
  const promoCode2Url = new URL(
    '/src/assets/img/background_promo2.jpg',
    import.meta.url,
  ).href;
  return (
    <div className={styles.main_page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.section_main}>
          <div className={styles.circle_container}>
            <div className={styles.circle} />
          </div>
          <div className={styles.fruit_image} />
        </section>
        <section className={styles.promocodes_block}>
          <h3 className={styles.title}>PROMO CODES</h3>
          <div className={styles.image_block}>
            <img
              className={styles.image}
              src={promoCode1Url}
              alt="promo_code"
            />
            <div className={styles.text_block}>
              <h4 className={styles.subtitle}>Citrus</h4>
              <p className={styles.text}>Get Up to 30% Off Citrus</p>
              <p className={styles.text_color}>Promo code: citrus_summer</p>
            </div>
            <div className={styles.discount}>
              30% <span className={styles.discount_color}>OFF</span>
            </div>
          </div>
          <div className={styles.image_block}>
            <img
              className={styles.image}
              src={promoCode2Url}
              alt="promo_code"
            />
            <div className={styles.text_block}>
              <h4 className={styles.subtitle}>Broccoli</h4>
              <p className={styles.text}>Get Up to 25% Off Broccoli</p>
              <p className={styles.text_color}>Promo code: broccoli_dream</p>
            </div>
            <div className={styles.discount}>
              25% <span className={styles.discount_color}>OFF</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
