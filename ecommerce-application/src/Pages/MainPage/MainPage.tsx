import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MyCartUpdateAction } from '@commercetools/platform-sdk';
import {
  getAnonymousFlowApiRoot,
  getClientCridentialsFlowApiRoot,
} from '../../api/clientBuilder';
import {
  addPromocodeToCart,
  addToCart,
  clearCart,
  getActiveCart,
  getDiscountCodeByID,
  getDiscountCodes,
  removeFromCart,
  removePromocodeFromCart,
} from '../../api/requests';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { ApiRootContext } from '../../context/ApiRootContext';
import { CustomTokenCache } from '../../features/autentification/utils/tokenCache';
import styles from './MainPage.module.scss';

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
      const productId = '32d901f5-a0f1-4828-be13-f8d422474229'; // lemon
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

const clearCartHandler = (): void => {
  getActiveCart().then(
    (cartResponse) => {
      const cart = cartResponse.body;
      // every time needs actual data from cart
      const lineItemId1 = '32d901f5-a0f1-4828-be13-f8d422474229'; // id of line in cart
      const lineItemId2 = '32d901f5-a0f1-4828-be13-f8d422474229'; // id of line in cart
      const quantity1 = 1;
      const quantity2 = 1;
      const actions: MyCartUpdateAction[] = [
        {
          action: 'removeLineItem',
          lineItemId: lineItemId1,
          quantity: quantity1,
        },
        {
          action: 'removeLineItem',
          lineItemId: lineItemId2,
          quantity: quantity2,
        },
      ];
      clearCart(cart, actions).then(
        (result) => console.log('Remove from cart result: ', result),
        (error: Error) => console.log(error),
      );
    },
    (error: Error) => console.log(error),
  );
};

const addPromocodeToCartHandler = (): void => {
  getActiveCart().then(
    (cartResponse) => {
      const cart = cartResponse.body;
      const code = 'citrus_summer';
      addPromocodeToCart(cart, code).then(
        (result) => console.log('Add to cart result: ', result),
        (error: Error) => console.log(error),
      );
    },
    (error: Error) => console.log(error),
  );
};

const removePromocodeFromCartHandler = (): void => {
  getActiveCart().then(
    (cartResponse) => {
      const cart = cartResponse.body;
      const discountCodeID = '3278faa3-6595-4147-bf30-e525b3bb1fed'; // id of promocode;
      removePromocodeFromCart(cart, discountCodeID).then(
        (result) => console.log('Add to cart result: ', result),
        (error: Error) => console.log(error),
      );
    },
    (error: Error) => console.log(error),
  );
};

const getDiscountCodesHandler = (): void => {
  getDiscountCodes().then(
    (result) => console.log('Promocodes :', result),
    (error: Error) => console.log(error),
  );
};

const getDiscountCodeByIDHandler = (): void => {
  const discountID = '3278faa3-6595-4147-bf30-e525b3bb1fed';
  getDiscountCodeByID(discountID).then(
    (result) => console.log('Promocodes :', result),
    (error: Error) => console.log(error),
  );
};

// eslint-disable-next-line max-lines-per-function
export function MainPage(): React.ReactElement {
  const apiRoot = useContext(ApiRootContext);

  const [quantityProducts, setQuantityProducts] = useState<number>();

  const getCart = (): void => {
    getActiveCart().then(
      (result) => {
        setQuantityProducts(result.body.totalLineItemQuantity);
      },
      (error: Error) => console.log(error),
    );
  };

  useEffect(() => {
    getCart();
  }, []);

  const testClientCridentialsFlowApiRoot = (): void => {
    const root = getClientCridentialsFlowApiRoot();
    console.log('ClientCridentialsFlowApiRoot', root);
    apiRoot.setFlowApiRoot(root);
  };
  const testAnonymousFlowApiRoot = (): void => {
    const tokenCache = new CustomTokenCache();
    const root = getAnonymousFlowApiRoot(tokenCache);
    console.log('AnonymousFlowApiRoot', root);
    apiRoot.setFlowApiRoot(root);
  };

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
      <Header quantityProducts={quantityProducts} />
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
        <br />
        <button type="button" onClick={addToCartHandler}>
          Add to cart
        </button>
        <br />
        <button type="button" onClick={removeFromCartHandler}>
          Remove from cart
        </button>
        <br />
        <button type="button" onClick={clearCartHandler}>
          clear cart
        </button>
        <br />
        <button type="button" onClick={addPromocodeToCartHandler}>
          Add promocode to cart
        </button>
        <br />
        <button type="button" onClick={removePromocodeFromCartHandler}>
          Remove promocode from cart
        </button>
        <br />
        <button type="button" onClick={getDiscountCodesHandler}>
          get discount codes
        </button>
        <br />
        <button type="button" onClick={getDiscountCodeByIDHandler}>
          get discount code by id (citrus)
        </button>
        <br />
        <button type="button" onClick={testClientCridentialsFlowApiRoot}>
          save ApiRoot to Context
        </button>
        <br />
        <button type="button" onClick={testAnonymousFlowApiRoot}>
          rewrite clientCridentialsFlowApiRoot to AnonymousFlowApiRoot
        </button>
        <br />
        <button
          type="button"
          onClick={(): void => console.log(apiRoot.flowApiRoot)}
        >
          get ApiRoot from Context
        </button>
      </main>
      <Footer />
    </div>
  );
}
