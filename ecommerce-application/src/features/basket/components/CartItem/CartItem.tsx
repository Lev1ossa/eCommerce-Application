import { MdOutlineClose } from 'react-icons/md';
import { useState } from 'react';
import { IItemData } from '../../../../types/types';
import styles from './CartItem.module.scss';

// eslint-disable-next-line max-lines-per-function
export function CartItem(props: { itemData: IItemData }): React.ReactElement {
  const { itemData } = props;
  const validPrice = itemData.price / 100;
  const validDiscountedPrice = itemData.discountedPrice / 100;
  const validTotalPrice = itemData.totalPrice / 100;
  const validTotalDiscountedPrice = itemData.totalPriceDiscounted / 100;

  const [currentQuantity, setCurrentQuantity] = useState(itemData.quantity);

  const increaseQuantity = (): void => {
    const increasedСurrentQuantity = currentQuantity + 1;
    setCurrentQuantity(increasedСurrentQuantity);
  };

  const decreaseQuantity = (): void => {
    const decreasedСurrentQuantity = currentQuantity - 1;
    if (decreasedСurrentQuantity >= 1) {
      setCurrentQuantity(decreasedСurrentQuantity);
    }
  };

  return (
    <>
      <div className={styles.product_block}>
        <img src={itemData.image} className={styles.image} alt="product" />
        <p className={styles.name}>{itemData.name}</p>
      </div>
      <div className={styles.quantity_block}>
        <button
          className={styles.quantity_button}
          onClick={decreaseQuantity}
          type="button"
        >
          -
        </button>
        <p className={styles.quantity}>{currentQuantity}</p>
        <button
          className={styles.quantity_button}
          onClick={increaseQuantity}
          type="button"
        >
          +
        </button>
      </div>
      {itemData.discountedPrice && (
        <div className={styles.prices_container}>
          <div className={styles.price_new}>$ {validDiscountedPrice}</div>
          <div className={styles.price_old}>$ {validPrice}</div>
        </div>
      )}
      {!itemData.discountedPrice && (
        <div className={styles.price}>$ {validPrice}</div>
      )}
      {itemData.totalPriceDiscounted && (
        <div className={styles.prices_container}>
          <div className={styles.price_new}>$ {validTotalDiscountedPrice}</div>
          <div className={styles.price_old}>$ {validTotalPrice}</div>
        </div>
      )}
      {!itemData.totalPriceDiscounted && (
        <div className={styles.price}>$ {validTotalPrice}</div>
      )}
      <MdOutlineClose
        className={styles.close_button}
        onClick={(): void => console.log(itemData.id)}
      />
    </>
  );
}
