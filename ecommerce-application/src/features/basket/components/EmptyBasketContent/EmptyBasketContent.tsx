import { BsCart3 } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import styles from './EmptyBasketContent.module.scss';
import { AnimationBlock } from '../../../animationBlock/AnimationBlock';

export function EmptyBasketContent(): React.ReactElement {
  const cartImageUrl = new URL(
    '/src/assets/img/cart_image.jpg',
    import.meta.url,
  ).href;
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <BsCart3 className={styles.title_icon} />
          <h2 className={styles.page_title}>My Cart</h2>
        </div>
        <AnimationBlock />
        <div className={styles.content_block}>
          <div className={styles.block}>
            <h2 className={styles.title}>Your cart is empty</h2>
            <p className={styles.text}>
              Before proceed to checkout, you must add some products to your
              cart. You will find a lot of interesting products on our
              &quot;Catalog&ldquo; page.
            </p>
            <NavLink className={styles.link} to="/catalog">
              Start Shopping
            </NavLink>
          </div>
          <div className={styles.block}>
            <img className={styles.image} src={cartImageUrl} alt="cart_image" />
          </div>
        </div>
      </div>
    </main>
  );
}
