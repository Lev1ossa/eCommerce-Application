import styles from './BuyButton.module.scss';

export function BuyButton(props: {
  isLoading: boolean;
  addToCartHandler: () => void;
  isProductInCart: boolean;
}): React.ReactElement {
  const { isLoading, isProductInCart, addToCartHandler } = props;

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
      {isProductInCart ? 'Already in cart' : 'Add to cart'}
    </button>
  );
}
