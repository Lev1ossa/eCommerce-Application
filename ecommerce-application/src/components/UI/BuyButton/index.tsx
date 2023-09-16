import styles from './BuyButton.module.scss';

export function BuyButton(props: {
  changeIsInCartState: () => void;
  addToCartHandler: () => void;
  isProductInCart: boolean;
}): React.ReactElement {
  const { isProductInCart, addToCartHandler, changeIsInCartState } = props;

  return (
    <button
      type="button"
      className={
        isProductInCart
          ? `${styles.button} ${styles.button_active}`
          : styles.button
      }
      onClick={(e): void => {
        addToCartHandler();
        changeIsInCartState();
        e.preventDefault();
      }}
    >
      {isProductInCart ? 'Already in cart' : 'Add to cart'}
    </button>
  );
}
