import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../context/CartContext';
import styles from './BuyButton.module.scss';

export function BuyButton(props: { productId: string }): React.ReactElement {
  const cart = useContext(CartContext);
  const { productId } = props;
  const [isUsed, setIsUsed] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    setIsInCart(cart.isItemInCart(productId));
  }, [cart, productId, cart.cartItems]);

  const changeIsUsedState = (): void => {
    setIsUsed(!isUsed);
  };
  const changeIsInCartState = (): void => {
    setIsInCart(true);
  };

  return (
    <button
      type="button"
      className={styles.button}
      onClick={(e): void => {
        cart.addItemToCart(productId);
        changeIsUsedState();
        changeIsInCartState();
        e.preventDefault();
      }}
    >
      {isUsed || isInCart ? 'Already in cart' : 'Add to cart'}
    </button>
  );
}
