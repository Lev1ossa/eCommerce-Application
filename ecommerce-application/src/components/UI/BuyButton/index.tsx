import styles from './BuyButton.module.scss';

export function BuyButton(): React.ReactElement {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={(e): void => e.preventDefault()}
    >
      Add to cart
    </button>
  );
}
