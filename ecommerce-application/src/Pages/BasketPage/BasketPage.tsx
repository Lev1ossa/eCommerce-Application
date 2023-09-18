import { useContext, useEffect, useState } from 'react';
import { Cart } from '@commercetools/platform-sdk';
import { Header } from '../../components/Header/Header';
import styles from './BasketPage.module.scss';
import { Footer } from '../../components/Footer/Footer';
import { NotEmptyBasketContent } from '../../features/basket/components/NotEmptyBasketContent/NotEmptyBasketContent';
import { EmptyBasketContent } from '../../features/basket/components/EmptyBasketContent/EmptyBasketContent';
import { getActiveCart } from '../../api/requests';
import { Loader } from '../../components/Loader';
import { ApiRootContext } from '../../context/ApiRootContext';
import { ApiRootContextProps } from '../../types/types';

export function BasketPage(): React.ReactElement {
  const [isLoading, setIsLoading] = useState(true);
  const [cartData, setCartData] = useState<Cart>();
  const refreshTokenFlowApiRoot = useContext(ApiRootContext);

  const getCart = (apiRoot: ApiRootContextProps): void => {
    getActiveCart(apiRoot).then(
      (result) => {
        setCartData(result.body);
        setIsLoading(false);
      },
      (error: Error) => console.log(error),
    );
  };

  useEffect(() => {
    getCart(refreshTokenFlowApiRoot);
  }, [refreshTokenFlowApiRoot]);

  const content = !cartData?.lineItems.length ? (
    <EmptyBasketContent />
  ) : (
    <NotEmptyBasketContent cartData={cartData} setCartData={setCartData} />
  );

  return (
    <div className={styles.main_page}>
      <Header quantityProducts={cartData?.totalLineItemQuantity} />
      {!isLoading ? content : <Loader />}
      <Footer />
    </div>
  );
}
