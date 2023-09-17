import { BsCart3 } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { useState } from 'react';
import { Cart, MyCartUpdateAction } from '@commercetools/platform-sdk';
import { CartItem } from '../CartItem/CartItem';
import styles from './NotEmptyBasketContent.module.scss';
import { Modal } from '../../../modal';
import { AnimationBlock } from '../../../animationBlock/AnimationBlock';
import {
  addPromocodeToCart,
  clearCart,
  getActiveCart,
} from '../../../../api/requests';
import { showToast } from '../../../autentification/utils/showToast';
import { ToastTypes } from '../../../../types/types';

// eslint-disable-next-line max-lines-per-function
export function NotEmptyBasketContent(props: {
  cartData: Cart | undefined;
  setCartData: React.Dispatch<React.SetStateAction<Cart | undefined>>;
}): React.ReactElement {
  const { cartData, setCartData } = props;
  const totalCoast = cartData ? cartData.totalPrice.centAmount / 100 : null;
  const promocodesId = cartData?.discountCodes.map((el) => {
    return {
      id: el.discountCode.id,
      name: 'citrus_summer',
    };
  });

  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);

  const [modalActive, setModalActive] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const getCart = (): void => {
    getActiveCart().then(
      (result) => {
        setCartData(result.body);
      },
      (error: Error) => console.log(error),
    );
  };

  const handleClearButton = (): void => {
    setModalActive(true);
  };

  const handleApproveButton = (): void => {
    setIsButtonsDisabled(true);
    getActiveCart().then(
      (cartResponse) => {
        const cart = cartResponse.body;
        const actions: MyCartUpdateAction[] = cart.lineItems.map((lineItem) => {
          return {
            action: 'removeLineItem',
            lineItemId: lineItem.id,
            quantity: lineItem.quantity,
          };
        });
        clearCart(cart, actions).then(
          (result) => {
            setCartData(result.body);
            setIsButtonsDisabled(false);
            getCart();
          },
          (error: Error) => console.log(error),
        );
      },
      (error: Error) => console.log(error),
    );
  };

  const handleCancelButton = (): void => {
    setModalActive(false);
  };

  const handleApplyPromocodeButton = (): void => {
    getActiveCart().then(
      (cartResponse) => {
        const cart = cartResponse.body;
        const code = inputValue;
        addPromocodeToCart(cart, code).then(
          (result) => {
            showToast(ToastTypes.success, `Promo code was applied!`);
            console.log('Add to cart result: ', result);
          },
          () => showToast(ToastTypes.error, 'Such promo code was not found!'),
        );
      },
      (error: Error) => console.log(error),
    );
    setInputValue('');
  };

  const modalImageUrl = new URL(
    '/src/assets/img/modal_image.png',
    import.meta.url,
  ).href;

  const cartList = cartData?.lineItems.map((cartItemData) => (
    <li key={cartItemData.id} className={styles.item}>
      <CartItem itemData={cartItemData} setCartData={setCartData} />
    </li>
  ));

  const handleRemoveButton = (id: string): void => {
    console.log(id);
  };

  const promoBlockContent = promocodesId
    ? promocodesId.map((el) => {
        return (
          <span className={styles.promocode} key={el.id}>
            {el.name}
            <button
              className={styles.remove_button}
              onClick={(): void => {
                handleRemoveButton(el.id);
              }}
              type="button"
            >
              x
            </button>
          </span>
        );
      })
    : null;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <BsCart3 className={styles.title_icon} />
          <h2 className={styles.page_title}>My Cart</h2>
          <AnimationBlock />
        </div>
        <button
          className={styles.clear_button}
          type="button"
          disabled={isButtonsDisabled}
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
        <div className={styles.promocode_container}>
          <div className={styles.input_block}>
            <input
              value={inputValue}
              className={styles.input}
              onChange={(event): void => {
                setInputValue(event.target.value);
              }}
              type="text"
            />
            <button
              className={styles.input_button}
              onClick={handleApplyPromocodeButton}
              disabled={!inputValue}
              type="button"
            >
              APPLY PROMO CODE
            </button>
          </div>
          <div className={styles.promocodesBlock}>{promoBlockContent}</div>
        </div>
        <div className={styles.subtotal}>
          <div className={styles.subtotal_title}>SUBTOTAL</div>
          <div className={styles.prices_container}>
            <div className={styles.price_new}>$ {totalCoast}</div>
            <div className={styles.price_old}>$ {totalCoast}</div>
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
                disabled={isButtonsDisabled}
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
