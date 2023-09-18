import { useContext, useEffect, useState } from 'react';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { LoginForm } from '../../features/autentification';
import styles from './LoginPage.module.css';
import { CartContext } from '../../context/CartContext';

export function LoginPage(): React.ReactElement {
  const [quantityProducts, setQuantityProducts] = useState<number>();
  const cartContext = useContext(CartContext);

  const getCart = (cartItemsCount: number): void => {
    setQuantityProducts(cartItemsCount);
  };

  useEffect(() => {
    getCart(cartContext.getCartItemsCount());
  }, [cartContext]);

  return (
    <div className={styles.login_page}>
      <Header quantityProducts={quantityProducts} />
      <LoginForm />
      <Footer />
    </div>
  );
}
