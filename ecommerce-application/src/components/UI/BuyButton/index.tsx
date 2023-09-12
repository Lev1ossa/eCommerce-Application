import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../context/CartContext';
import styles from './BuyButton.module.scss';

export function BuyButton(props: { productId: string }): React.ReactElement {
  const cart = useContext(CartContext);
  const { productId } = props;
  const [isProductInCart, setIsProductInCart] = useState(false);

  useEffect(() => {
    setIsProductInCart(cart.isItemInCart(productId));
  }, [cart, productId, cart.cartItems]);

  const changeIsInCartState = (): void => {
    setIsProductInCart(true);
  };

  return (
    <button
      type="button"
      className={styles.button}
      onClick={(e): void => {
        cart.addItemToCart(productId);
        changeIsInCartState();
        e.preventDefault();
      }}
    >
      {isProductInCart ? 'Already in cart' : 'Add to cart'}
    </button>
  );
}
