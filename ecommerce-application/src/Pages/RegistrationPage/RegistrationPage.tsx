import { useEffect, useState } from 'react';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { RegistrationForm } from '../../features/autentification';
import styles from './RegistrationPage.module.css';
import { getActiveCart } from '../../api/requests';

export function RegistrationPage(): React.ReactElement {
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
    <div className={styles.registration_page}>
      <Header quantityProducts={quantityProducts} />
      <RegistrationForm />
      <Footer />
    </div>
  );
}
