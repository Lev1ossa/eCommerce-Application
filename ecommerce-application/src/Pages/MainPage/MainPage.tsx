import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { CartContext } from '../../context/CartContext';
import styles from './MainPage.module.scss';
import { MainSlider } from '../../features/mainSlider/components/MainSlider';

// eslint-disable-next-line max-lines-per-function
export function MainPage(): React.ReactElement {
  const [quantityProducts, setQuantityProducts] = useState<number>();
  const cartContext = useContext(CartContext);

  const getCart = (cartItemsCount: number | undefined): void => {
    setQuantityProducts(cartItemsCount);
  };

  useEffect(() => {
    getCart(cartContext.getCartItemsCount());
  }, [cartContext]);

  return (
    <div className={styles.main_page}>
      <Header quantityProducts={quantityProducts} />
      <main className={styles.main}>
        <MainSlider />
        <section className={styles.promocodes_block}>
          <h3 className={styles.title_container}>
            <span className={styles.title}>PROMO CODES</span>
          </h3>
          <div className={styles.images_container}>
            <div className={styles.image_block}>
              <div className={styles.image_lemon} />
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
              <div className={styles.image_broccoli} />
              <div className={styles.text_block}>
                <h4 className={styles.subtitle}>Broccoli</h4>
                <p className={styles.text}>Get Up to 25% Off Broccoli</p>
                <p className={styles.text_color}>Promo code: broccoli_dream</p>
              </div>
              <div className={styles.discount}>
                25% <span className={styles.discount_color}>OFF</span>
              </div>
            </div>
          </div>
        </section>
        <div className={styles.title_container}>
          <h3 className={styles.title_slider}>FRESH MOOD</h3>
        </div>
        <section className={styles.section_main}>
          <div className={styles.main_text_block}>
            <p className={styles.text_bold}>Fresh & Tasty</p>
            <p className={styles.text_normal}>Fruits & Vegetables</p>
            <p className={styles.text_small}>every day</p>
            <NavLink className={styles.link} to="/registration">
              Become Our Client
            </NavLink>
          </div>
          <div className={styles.circle_container}>
            <div className={styles.circle} />
          </div>
          <div className={styles.fruit_image} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
