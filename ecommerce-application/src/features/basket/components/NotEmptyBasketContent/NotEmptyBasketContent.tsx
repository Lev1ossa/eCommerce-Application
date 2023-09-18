import { BsCart3, BsTrash3 } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import {
  Cart,
  DiscountCode,
  MyCartUpdateAction,
} from '@commercetools/platform-sdk';
import { CartItem } from '../CartItem/CartItem';
import styles from './NotEmptyBasketContent.module.scss';
import { Modal } from '../../../modal';
import { AnimationBlock } from '../../../animationBlock/AnimationBlock';
import {
  addPromocodeToCart,
  clearCart,
  getActiveCart,
  getDiscountCodes,
  removePromocodeFromCart,
} from '../../../../api/requests';
import { showToast } from '../../../autentification/utils/showToast';
import { ToastTypes } from '../../../../types/types';
import { Loader } from '../../../../components/Loader';

// eslint-disable-next-line max-lines-per-function
export function NotEmptyBasketContent(props: {
  cartData: Cart | undefined;
  setCartData: React.Dispatch<React.SetStateAction<Cart | undefined>>;
}): React.ReactElement {
  const { cartData, setCartData } = props;

  const totalCoast = cartData ? cartData.totalPrice.centAmount / 100 : null;

  const totalOldCoast = cartData?.lineItems.reduce((acc, currentVal) => {
    if (currentVal.price.discounted) {
      return (
        acc +
        (currentVal.price.discounted.value.centAmount * currentVal.quantity) /
          100
      );
    }
    return (
      acc + (currentVal.price.value.centAmount * currentVal.quantity) / 100
    );
  }, 0);

  const promocodesId = cartData?.discountCodes.map((el) => {
    return {
      id: el.discountCode.id,
      name: '',
    };
  });

  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [promocodes, setPromocodes] = useState<DiscountCode[]>();

  const [modalActive, setModalActive] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const getPromocodes = (): void => {
    getDiscountCodes().then(
      (result) => {
        setPromocodes(result.body.results);
        setIsLoading(false);
      },
      (error: Error) => console.log(error),
    );
  };

  useEffect(() => {
    getPromocodes();
  }, []);

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
            setCartData(result.body);
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
    getActiveCart().then(
      (cartResponse) => {
        const cart = cartResponse.body;
        const discountCodeID = id;
        removePromocodeFromCart(cart, discountCodeID).then(
          (result) => setCartData(result.body),
          (error: Error) => console.log(error),
        );
      },
      (error: Error) => console.log(error),
    );
  };

  const promoBlockContent = promocodesId
    ? promocodesId.map((el) => {
        return (
          <span className={styles.promocode} key={el.id}>
            {
              promocodes?.find((elem) => {
                return elem.id === el.id;
              })?.code
            }
            <BsTrash3
              className={styles.remove_button}
              onClick={(): void => {
                handleRemoveButton(el.id);
              }}
            />
          </span>
        );
      })
    : null;

  const subtotalContent =
    cartData?.discountCodes.length &&
    totalCoast?.toFixed(2) !== totalOldCoast?.toFixed(2) ? (
      <div className={styles.prices_container}>
        <div className={styles.price_new}>$ {totalCoast?.toFixed(2)}</div>
        <div className={styles.price}>$ {totalOldCoast?.toFixed(2)}</div>
      </div>
    ) : (
      <div className={styles.price_new}>$ {totalCoast?.toFixed(2)}</div>
    );

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
          <BsTrash3 className={styles.button_icon} />
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
          <form className={styles.input_block}>
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
              type="submit"
            >
              APPLY PROMO CODE
            </button>
          </form>
          <div className={styles.promocodesBlock}>
            {!isLoading ? promoBlockContent : <Loader />}
          </div>
        </div>
        <div className={styles.subtotal}>
          <div className={styles.subtotal_title}>SUBTOTAL</div>
          {subtotalContent}
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
