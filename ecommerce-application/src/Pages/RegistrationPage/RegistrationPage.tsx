import { useContext, useEffect, useState } from 'react';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { RegistrationForm } from '../../features/autentification';
import styles from './RegistrationPage.module.css';
import { CartContext } from '../../context/CartContext';

export function RegistrationPage(): React.ReactElement {
  const [quantityProducts, setQuantityProducts] = useState<number>();
  const cartContext = useContext(CartContext);

  const getCart = (cartItemsCount: number | undefined): void => {
    setQuantityProducts(cartItemsCount);
  };

  useEffect(() => {
    getCart(cartContext.getCartItemsCount());
  }, [cartContext]);

  return (
    <div className={styles.registration_page}>
      <Header quantityProducts={quantityProducts} />
      <RegistrationForm />
      <Footer />
    </div>
  );
}
