import styles from './BuyButton.module.scss';

export function BuyButton(props: {
  addProductToCart: () => void;
  changeIsInCartState: () => void;
  addToCartHandler: () => void;
  isProductInCart: boolean;
}): React.ReactElement {
  const {
    isProductInCart,
    addProductToCart,
    addToCartHandler,
    changeIsInCartState,
  } = props;

  return (
    <button
      type="button"
      className={
        isProductInCart
          ? `${styles.button} ${styles.button_active}`
          : styles.button
      }
      onClick={(e): void => {
        addProductToCart();
        addToCartHandler();
        changeIsInCartState();
        e.preventDefault();
      }}
    >
      {isProductInCart ? 'Already in cart' : 'Add to cart'}
    </button>
  );
}
