import { LineItem } from '@commercetools/platform-sdk';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getActiveCart } from '../api/requests';

type CartProviderProps = {
  children: React.ReactNode;
};

type CartContextProps = {
  isItemInCart: (id: string) => boolean;
  removeItemFromCart: (id: string) => void;
  cartItems: LineItem[];
  setCartItems: React.Dispatch<React.SetStateAction<LineItem[]>>;
};
export const CartContext = createContext({} as CartContextProps);

// eslint-disable-next-line max-lines-per-function
export function CartContextProvider({
  children,
}: CartProviderProps): React.ReactElement {
  const [cartItems, setCartItems] = useState<LineItem[]>([]);

  useEffect(() => {
    getActiveCart().then(
      (result) => {
        console.log('CART: ', result.body.lineItems);
        setCartItems(result.body.lineItems);
      },
      (error: Error) => console.log(error),
    );
  }, []);

  const isItemInCart = useCallback(
    (id: string): boolean => {
      return !!cartItems.find((cartItem) => cartItem.productId === id);
    },
    [cartItems],
  );

  // const addItemToCart = useCallback(
  //   (id: string): void => {
  //     if (!isItemInCart(id)) {
  //       setCartItems((prev) => [...prev, { id, count: 1 }]);
  //     }
  //   },
  //   [isItemInCart],
  // );
  const removeItemFromCart = useCallback(
    (id: string): void => {
      if (isItemInCart(id)) {
        setCartItems(cartItems.filter((item) => item.id !== id));
      }
    },
    [isItemInCart, cartItems],
  );

  const CartContextValue: CartContextProps = useMemo(
    () => ({
      removeItemFromCart,
      isItemInCart,
      cartItems,
      setCartItems,
    }),
    [removeItemFromCart, isItemInCart, cartItems, setCartItems],
  );

  return (
    <CartContext.Provider value={CartContextValue}>
      {children}
    </CartContext.Provider>
  );
}
