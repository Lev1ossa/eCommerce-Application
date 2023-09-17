import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import styles from './BuyCountButton.module.scss';

export function BuyCountButton(props: {
  addToCartHandler: () => void;
  productCount: number;
}): React.ReactElement {
  const { addToCartHandler, productCount } = props;

  const cart = useContext(CartContext);
  return (
    <div className={styles.container}>
      <NavLink to="/cart">
        <button
          type="button"
          className={styles.button}
          disabled={cart.isLoading}
        >
          in cart
        </button>
      </NavLink>
      <button type="button" className={styles.count_button}>
        -
      </button>
      <div className={styles.counter}>{productCount}</div>
      <button
        type="button"
        className={styles.count_button}
        disabled={cart.isLoading}
        onClick={(e): void => {
          addToCartHandler();
          e.preventDefault();
        }}
      >
        +
      </button>
    </div>
  );
}
