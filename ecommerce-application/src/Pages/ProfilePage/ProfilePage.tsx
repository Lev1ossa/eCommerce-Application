import { useContext, useEffect, useState } from 'react';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Profile } from '../../features/profile';
import styles from './Profile.module.scss';
import { CartContext } from '../../context/CartContext';

export function ProfilePage(): React.ReactElement {
  const [quantityProducts, setQuantityProducts] = useState<number>();
  const cartContext = useContext(CartContext);

  const getCart = (cartItemsCount: number): void => {
    setQuantityProducts(cartItemsCount);
  };

  useEffect(() => {
    getCart(cartContext.getCartItemsCount());
  }, [cartContext]);

  return (
    <div className={styles.wrapper}>
      <Header quantityProducts={quantityProducts} />
      <Profile />
      <Footer />
    </div>
  );
}
