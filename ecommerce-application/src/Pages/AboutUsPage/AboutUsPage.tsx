import { useEffect, useState } from 'react';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { AboutUsContent } from '../../features/aboutUs/components/AboutUsContent';
import styles from './AboutUsPage.module.scss';
import { getActiveCart } from '../../api/requests';

export function AboutUsPage(): React.ReactElement {
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
    <div className={styles.main_page}>
      <Header quantityProducts={quantityProducts} />
      <AboutUsContent />
      <Footer />
    </div>
  );
}
