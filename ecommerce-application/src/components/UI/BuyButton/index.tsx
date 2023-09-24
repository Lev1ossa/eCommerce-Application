import { ButtonLoader } from '../ButtonLoader';
import styles from './BuyButton.module.scss';

export function BuyButton(props: {
  isLoading: boolean;
  addToCartHandler: () => void;
  isCartLoading: boolean;
}): React.ReactElement {
  const { isCartLoading, isLoading, addToCartHandler } = props;

  return (
    <button
      type="button"
      className={styles.button}
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
