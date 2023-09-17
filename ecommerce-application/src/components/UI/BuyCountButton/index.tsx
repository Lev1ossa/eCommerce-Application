import { NavLink } from 'react-router-dom';
import styles from './BuyCountButton.module.scss';

// eslint-disable-next-line max-lines-per-function
export function BuyCountButton(props: {
  addToCartHandler: () => void;
  productCount: number;
  isLoading: boolean;
}): React.ReactElement {
  const { addToCartHandler, productCount, isLoading } = props;

  return (
    <div className={styles.container}>
      <NavLink to="/cart" className={styles.button_container}>
        <button type="button" className={styles.button} disabled={isLoading}>
          to cart
        </button>
      </NavLink>
      <div className={styles.counter_container}>
        <button type="button" className={styles.count_button}>
          -
        </button>
        <div className={styles.counter}>{productCount}</div>
        <button
          type="button"
          className={styles.count_button}
          disabled={isLoading}
          onClick={(e): void => {
            addToCartHandler();
            e.preventDefault();
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
