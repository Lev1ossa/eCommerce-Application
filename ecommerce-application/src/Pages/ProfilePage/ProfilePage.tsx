import { useEffect, useState } from 'react';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Profile } from '../../features/profile';
import styles from './Profile.module.scss';
import { getActiveCart } from '../../api/requests';

export function ProfilePage(): React.ReactElement {
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
    <div className={styles.wrapper}>
      <Header quantityProducts={quantityProducts} />
      <Profile />
      <Footer />
    </div>
  );
}
