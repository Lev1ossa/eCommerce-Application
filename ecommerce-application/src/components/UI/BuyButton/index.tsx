import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import styles from './BuyButton.module.scss';

export function BuyButton(props: {
  addToCartHandler: () => void;
  isProductInCart: boolean;
}): React.ReactElement {
  const { isProductInCart, addToCartHandler } = props;

  const cart = useContext(CartContext);
  return (
    <button
      type="button"
      className={
        isProductInCart
          ? `${styles.button} ${styles.button_active}`
          : styles.button
      }
      disabled={cart.isLoading}
      onClick={(e): void => {
        addToCartHandler();
        e.preventDefault();
      }}
    >
      {isProductInCart ? 'Already in cart' : 'Add to cart'}
    </button>
  );
}
