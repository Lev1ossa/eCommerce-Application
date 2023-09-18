import { ButtonLoader } from '../ButtonLoader';
import styles from './BuyButton.module.scss';

export function BuyButton(props: {
  isLoading: boolean;
  addToCartHandler: () => void;
  isProductInCart: boolean;
  isCartLoading: boolean;
}): React.ReactElement {
  const { isCartLoading, isLoading, isProductInCart, addToCartHandler } = props;

  return (
    <button
      type="button"
      className={
        isProductInCart
          ? `${styles.button} ${styles.button_active}`
          : styles.button
      }
      disabled={isLoading}
      onClick={(e): void => {
        addToCartHandler();
        e.preventDefault();
      }}
    >
      {isCartLoading ? <ButtonLoader /> : 'Add to cart'}
    </button>
  );
}
