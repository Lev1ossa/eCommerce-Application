import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonLoader } from '../ButtonLoader';
import styles from './BuyCountButton.module.scss';

// eslint-disable-next-line max-lines-per-function
export function BuyCountButton(props: {
  addToCartHandler: () => void;
  removeFromCartHandler: () => void;
  productCount: number;
  isLoading: boolean;
  isCartLoading: boolean;
}): React.ReactElement {
  const {
    addToCartHandler,
    removeFromCartHandler,
    productCount,
    isLoading,
    isCartLoading,
  } = props;
  const [isHover, setIsHover] = useState(false);
  const [buttonContent, setButtonContent] = useState<
    string | React.ReactElement
  >(`${productCount} added`);
  const navigate = useNavigate();

  const handleNavigate = (path: string): void => {
    navigate(path);
  };

  useEffect(() => {
    if (isHover) {
      setButtonContent('to cart');
    } else {
      setButtonContent(
        isCartLoading ? <ButtonLoader /> : `${productCount} added`,
      );
    }
  }, [isCartLoading, productCount, isHover]);

  return (
    <div className={styles.container}>
      <div className={styles.counter_container}>
        <button
          type="button"
          className={styles.count_button}
          disabled={isLoading}
          onClick={(e): void => {
            removeFromCartHandler();
            e.preventDefault();
          }}
        >
          -
        </button>
        <button
          type="button"
          className={styles.button}
          disabled={isLoading}
          onFocus={(): number => 0}
          onMouseOver={(): void => setIsHover(true)}
          onMouseLeave={(): void => setIsHover(false)}
          onClick={(e): void => {
            handleNavigate('/cart');
            e.preventDefault();
          }}
        >
          {buttonContent}
        </button>
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
