import { useNavigate } from 'react-router-dom';
import styles from './BuyCountButton.module.scss';

// eslint-disable-next-line max-lines-per-function
export function BuyCountButton(props: {
  addToCartHandler: () => void;
  productCount: number;
  isLoading: boolean;
}): React.ReactElement {
  const { addToCartHandler, productCount, isLoading } = props;

  const navigate = useNavigate();

  const handleNavigate = (path: string): void => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.button}
        disabled={isLoading}
        onClick={(e): void => {
          handleNavigate('/cart');
          e.preventDefault();
        }}
      >
        to cart
      </button>
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
