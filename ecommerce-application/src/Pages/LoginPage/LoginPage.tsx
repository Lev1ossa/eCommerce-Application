import { useEffect, useState } from 'react';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { LoginForm } from '../../features/autentification';
import styles from './LoginPage.module.css';
import { getActiveCart } from '../../api/requests';

export function LoginPage(): React.ReactElement {
  const [quantityProducts, setQuantityProducts] = useState<number>();

  const getCart = (): void => {
    getActiveCart().then(
      (result) => {
        setQuantityProducts(result.body.totalLineItemQuantity);
      },
      (error: Error) => console.log(error),
    );
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className={styles.login_page}>
      <Header quantityProducts={quantityProducts} />
      <LoginForm />
      <Footer />
    </div>
  );
}
