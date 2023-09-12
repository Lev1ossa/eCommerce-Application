import styles from './BuyButton.module.scss';

export function BuyButton(props: {
  onAddToCart: () => void;
}): React.ReactElement {
  const { onAddToCart } = props;
  return (
    <button
      type="button"
      className={styles.button}
      onClick={(e): void => {
        onAddToCart();
        e.preventDefault();
      }}
    >
      Add to cart
    </button>
  );
}
