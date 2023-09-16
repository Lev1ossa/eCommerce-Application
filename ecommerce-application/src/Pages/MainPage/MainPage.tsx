import { NavLink } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import styles from './MainPage.module.scss';
import { Footer } from '../../components/Footer/Footer';
import { addToCart, getActiveCart, removeFromCart } from '../../api/requests';

// TODO Delete all handlers, imports and buttons
const getCartHandler = (): void => {
  getActiveCart().then(
    (result) => {
      console.log('CART: ', result.body);
    },
    (error: Error) => console.log(error),
  );
};

const addToCartHandler = (): void => {
  getActiveCart().then(
    (cartResponse) => {
      const cart = cartResponse.body;
      const productId = 'cb555e3d-7c53-4bd7-ac06-6de21d803716'; // banana
      const quantity = 1;
      addToCart(cart, productId, quantity).then(
        (result) => console.log('Add to cart result: ', result),
        (error: Error) => console.log(error),
      );
    },
    (error: Error) => console.log(error),
  );
};

const removeFromCartHandler = (): void => {
  getActiveCart().then(
    (cartResponse) => {
      const cart = cartResponse.body;
      const lineItemID = 'cf72446f-fae4-4ffa-8853-edc72e589cb4'; // id of line in cart
      const quantity = 1;
      removeFromCart(cart, lineItemID, quantity).then(
        (result) => console.log('Remove from cart result: ', result),
        (error: Error) => console.log(error),
      );
    },
    (error: Error) => console.log(error),
  );
};

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
          <div className={styles.main_text_block}>
            <p className={styles.text_bold}>Fresh & Tasty</p>
            <p className={styles.text_normal}>Fruits & Vegetables</p>
            <p className={styles.text_small}>every day</p>
            <NavLink className={styles.link} to="/catalog">
              Start Shopping
            </NavLink>
          </div>
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
        <button type="button" onClick={getCartHandler}>
          Get cart
        </button>
        <button type="button" onClick={addToCartHandler}>
          Add to cart
        </button>
        <button type="button" onClick={removeFromCartHandler}>
          Remove from cart
        </button>
      </main>
      <Footer />
    </div>
  );
}
