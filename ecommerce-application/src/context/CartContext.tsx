import { LineItem } from '@commercetools/platform-sdk';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getActiveCart } from '../api/requests';
import { ApiRootContext } from './ApiRootContext';

type CartProviderProps = {
  children: React.ReactNode;
};

type CartContextProps = {
  isItemInCart: (id: string) => boolean;
  getItemCount: (id: string) => number;
  getLineItemId: (id: string) => string;
  removeItemFromCart: (id: string) => void;
  setCartItems: React.Dispatch<React.SetStateAction<LineItem[]>>;
  getCartItemsCount: () => number | undefined;
};
export const CartContext = createContext({} as CartContextProps);

export function CartContextProvider({
  children,
}: CartProviderProps): React.ReactElement {
  const [cartItems, setCartItems] = useState<LineItem[]>([]);
  const refreshTokenFlowApiRoot = useContext(ApiRootContext);

  const getCart = useCallback(() => {
    getActiveCart(refreshTokenFlowApiRoot).then(
      (result) => {
        setCartItems(result.body.lineItems);
      },
      (error: Error) => console.log(error),
    );
  }, [refreshTokenFlowApiRoot]);

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

  const getCartItemsCount = useCallback((): number | undefined => {
    const cartItemsCount = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    return cartItemsCount || undefined;
  }, [cartItems]);

  const CartContextValue: CartContextProps = useMemo(
    () => ({
      removeItemFromCart,
      isItemInCart,
      getItemCount,
      getLineItemId,
      cartItems,
      setCartItems,
      getCartItemsCount,
    }),
    [
      removeItemFromCart,
      isItemInCart,
      getItemCount,
      getLineItemId,
      cartItems,
      setCartItems,
      getCartItemsCount,
    ],
  );

  return (
    <CartContext.Provider value={CartContextValue}>
      {children}
    </CartContext.Provider>
  );
}
