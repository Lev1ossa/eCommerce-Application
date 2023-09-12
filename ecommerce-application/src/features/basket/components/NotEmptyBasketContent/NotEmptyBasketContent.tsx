import { IItemData } from '../../../../types/types';
import { CartItem } from '../CartItem/CartItem';
import styles from './NotEmptyBasketContent.module.scss';

export function NotEmptyBasketContent(props: {
  cartItemsData: IItemData[];
  setEmpty: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactElement {
  const { cartItemsData, setEmpty } = props;

  const handleButton = (): void => {
    setEmpty(true);
  };

  const cartList = cartItemsData.map((cartItemData) => (
    <li key={cartItemData.id} className={styles.item}>
      <CartItem itemData={cartItemData} />
    </li>
  ));
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header_title}>PRODUCT</div>
          <div className={styles.header_title}>QUANTITY</div>
          <div className={styles.header_title}>UNIT PRICE</div>
          <div className={styles.header_title}>TOTAL PRICE</div>
        </div>
        <ul className={styles.list}>{cartList}</ul>
      </div>
      <button className={styles.button} onClick={handleButton} type="button">
        Clear Cart
      </button>
    </main>
  );
}
