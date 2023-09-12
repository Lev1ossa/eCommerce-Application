import { MdOutlineClose } from 'react-icons/md';
import { IItemData } from '../../../../types/types';
import styles from './CartItem.module.scss';

export function CartItem(props: { itemData: IItemData }): React.ReactElement {
  const { itemData } = props;
  const validPrice = itemData.price / 100;
  const validDiscountedPrice = itemData.discountedPrice / 100;
  const validTotalPrice = itemData.totalPrice / 100;
  const validTotalPriceDiscounted = itemData.totalPriceDiscounted / 100;
  return (
    <>
      <div className={styles.product_block}>
        <img src={itemData.image} className={styles.image} alt="product" />
        <p className={styles.name}>{itemData.name}</p>
      </div>
      <p className={styles.quantity}>{itemData.quantity}</p>
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
          <div className={styles.price_new}>$ {validTotalPriceDiscounted}</div>
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
