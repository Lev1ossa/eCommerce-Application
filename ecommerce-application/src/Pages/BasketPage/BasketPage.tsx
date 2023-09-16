import { useEffect, useState } from 'react';
import { Cart } from '@commercetools/platform-sdk';
import { Header } from '../../components/Header/Header';
import styles from './BasketPage.module.scss';
import { Footer } from '../../components/Footer/Footer';
import { NotEmptyBasketContent } from '../../features/basket/components/NotEmptyBasketContent/NotEmptyBasketContent';
import { EmptyBasketContent } from '../../features/basket/components/EmptyBasketContent/EmptyBasketContent';
import { getActiveCart } from '../../api/requests';
import { Loader } from '../../components/Loader';

export function BasketPage(): React.ReactElement {
  const [isLoading, setIsLoading] = useState(true);
  const [cartData, setCartData] = useState<Cart>();

  const getCart = (): void => {
    getActiveCart().then(
      (result) => {
        setCartData(result.body);
      },
      (error: Error) => console.log(error),
    );
  };

  useEffect(() => {
    getCart();
    setIsLoading(false);
  }, []);

  const content = !cartData?.lineItems.length ? (
    <EmptyBasketContent />
  ) : (
    <NotEmptyBasketContent cartData={cartData} setCartData={setCartData} />
  );

  return (
    <div className={styles.main_page}>
      <Header />
      {!isLoading ? content : <Loader />}
      <Footer />
    </div>
  );
}
