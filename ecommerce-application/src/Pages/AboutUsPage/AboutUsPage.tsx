import { useContext, useEffect, useState } from 'react';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { AboutUsContent } from '../../features/aboutUs/components/AboutUsContent';
import styles from './AboutUsPage.module.scss';
import { CartContext } from '../../context/CartContext';

export function AboutUsPage(): React.ReactElement {
  const [quantityProducts, setQuantityProducts] = useState<number>();
  const cartContext = useContext(CartContext);

  const getCart = (cartItemsCount: number): void => {
    setQuantityProducts(cartItemsCount);
  };

  useEffect(() => {
    getCart(cartContext.getCartItemsCount());
  }, [cartContext]);

  return (
    <div className={styles.main_page}>
      <Header quantityProducts={quantityProducts} />
      <AboutUsContent />
      <Footer />
    </div>
  );
}
