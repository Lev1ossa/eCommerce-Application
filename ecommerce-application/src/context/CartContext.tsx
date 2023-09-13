import { createContext, useCallback, useMemo, useState } from 'react';

type CartProviderProps = {
  children: React.ReactNode;
};
type CartItem = {
  id: string;
  count: number;
};
type CartContextProps = {
  isItemInCart: (id: string) => boolean;
  addItemToCart: (id: string) => void;
  removeItemFromCart: (id: string) => void;
  cartItems: CartItem[];
};
export const CartContext = createContext({} as CartContextProps);

// eslint-disable-next-line max-lines-per-function
export function CartContextProvider({
  children,
}: CartProviderProps): React.ReactElement {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const isItemInCart = useCallback(
    (id: string): boolean => {
      return !!cartItems.find((cartItem) => cartItem.id === id);
    },
    [cartItems],
  );

  const addItemToCart = useCallback(
    (id: string): void => {
      if (!isItemInCart(id)) {
        setCartItems((prev) => [...prev, { id, count: 1 }]);
      }
    },
    [isItemInCart],
  );
  const removeItemFromCart = useCallback(
    (id: string): void => {
      if (isItemInCart(id)) {
        setCartItems(cartItems.filter((item) => item.id !== id));
      }
    },
    [isItemInCart, cartItems],
  );

  const CartContextValue: CartContextProps = useMemo(
    () => ({ addItemToCart, removeItemFromCart, isItemInCart, cartItems }),
    [addItemToCart, removeItemFromCart, isItemInCart, cartItems],
  );

  return (
    <CartContext.Provider value={CartContextValue}>
      {children}
    </CartContext.Provider>
  );
}
