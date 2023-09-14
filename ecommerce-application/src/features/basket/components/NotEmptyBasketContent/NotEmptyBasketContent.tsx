import { BsCart3 } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { useState } from 'react';
import { IItemData } from '../../../../types/types';
import { CartItem } from '../CartItem/CartItem';
import styles from './NotEmptyBasketContent.module.scss';
import { Modal } from '../../../modal';

// eslint-disable-next-line max-lines-per-function
export function NotEmptyBasketContent(props: {
  cartItemsData: IItemData[];
  setEmpty: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactElement {
  const { cartItemsData, setEmpty } = props;

  const [modalActive, setModalActive] = useState(false);

  const handleClearButton = (): void => {
    setModalActive(true);
  };

  const handleApproveButton = (): void => {
    // request
    setEmpty(true);
  };

  const handleCancelButton = (): void => {
    setModalActive(false);
  };

  const modalImageUrl = new URL(
    '/src/assets/img/modal_image.png',
    import.meta.url,
  ).href;

  const cartList = cartItemsData.map((cartItemData) => (
    <li key={cartItemData.id} className={styles.item}>
      <CartItem itemData={cartItemData} />
    </li>
  ));
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <BsCart3 className={styles.title_icon} />
          <h2 className={styles.page_title}>My Cart</h2>
        </div>
        <button
          className={styles.clear_button}
          type="button"
          onClick={handleClearButton}
        >
          <AiOutlineDelete className={styles.button_icon} />
          Clear Cart
        </button>
        <div className={styles.header}>
          <div className={styles.header_title}>PRODUCT</div>
          <div className={styles.header_title}>QUANTITY</div>
          <div className={styles.header_title}>UNIT PRICE</div>
          <div className={styles.header_title}>TOTAL PRICE</div>
        </div>
        <ul className={styles.list}>{cartList}</ul>
        <div className={styles.promocode_block}>
          <input
            className={styles.input}
            onBlur={(event): void => console.log(event.target.value)}
            type="text"
          />
          <button className={styles.input_button} type="button">
            APPLY PROMO CODE
          </button>
        </div>
        <div className={styles.subtotal}>
          <div className={styles.subtotal_title}>SUBTOTAL</div>
          <div className={styles.prices_container}>
            <div className={styles.price_new}>$ 72</div>
            <div className={styles.price_old}>$ 52</div>
          </div>
        </div>
      </div>
      {modalActive && (
        <Modal active={modalActive} setActive={setModalActive} title="">
          <div className={styles.block}>
            <p className={styles.modal_text}>
              Do you really want to clear your cart?
            </p>
            <div className={styles.modal_buttons_container}>
              <button
                className={styles.modal_button}
                onClick={handleApproveButton}
                type="button"
              >
                YES
              </button>
              <button
                className={styles.modal_button}
                onClick={handleCancelButton}
                type="button"
              >
                NO
              </button>
            </div>
            <img
              className={styles.image}
              src={modalImageUrl}
              alt="modal_image"
            />
          </div>
        </Modal>
      )}
    </main>
  );
}
