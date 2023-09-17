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
  getItemCount: (id: string) => number;
  getLineItemId: (id: string) => string;
  removeItemFromCart: (id: string) => void;
  getCart: () => void;
  setCartItems: React.Dispatch<React.SetStateAction<LineItem[]>>;
  isLoading: boolean;
};
export const CartContext = createContext({} as CartContextProps);

// eslint-disable-next-line max-lines-per-function
export function CartContextProvider({
  children,
}: CartProviderProps): React.ReactElement {
  const [cartItems, setCartItems] = useState<LineItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCart = useCallback(() => {
    setIsLoading(true);
    getActiveCart()
      .then(
        (result) => {
          console.log('CART: ', result.body.lineItems);
          setCartItems(result.body.lineItems);
        },
        (error: Error) => console.log(error),
      )
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    getCart();
  }, [getCart]);

  const isItemInCart = useCallback(
    (id: string): boolean => {
      return !!cartItems.find((cartItem) => cartItem.productId === id);
    },
    [cartItems],
  );

  const getLineItemId = useCallback(
    (id: string): string => {
      const LineItemId = cartItems.find(
        (cartItem) => cartItem.productId === id,
      );
      return LineItemId ? LineItemId.id : '';
    },
    [cartItems],
  );

  const getItemCount = useCallback(
    (id: string): number => {
      const item = cartItems.find((cartItem) => cartItem.productId === id);
      return item ? item.quantity : 1;
    },
    [cartItems],
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
    () => ({
      removeItemFromCart,
      isItemInCart,
      getItemCount,
      getLineItemId,
      cartItems,
      setCartItems,
      getCart,
      isLoading,
    }),
    [
      removeItemFromCart,
      isItemInCart,
      getItemCount,
      getLineItemId,
      cartItems,
      setCartItems,
      getCart,
      isLoading,
    ],
  );

  return (
    <CartContext.Provider value={CartContextValue}>
      {children}
    </CartContext.Provider>
  );
}
