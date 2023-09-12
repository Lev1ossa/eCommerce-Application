import { useState } from 'react';
import { Header } from '../../components/Header/Header';
import styles from './BasketPage.module.scss';
import { Footer } from '../../components/Footer/Footer';
import { NotEmptyBasketContent } from '../../features/basket/components/NotEmptyBasketContent/NotEmptyBasketContent';
import { EmptyBasketContent } from '../../features/basket/components/EmptyBasketContent/EmptyBasketContent';

export function BasketPage(): React.ReactElement {
  const [isEmpty, setEmpty] = useState(true);

  const content = isEmpty ? (
    <EmptyBasketContent />
  ) : (
    <NotEmptyBasketContent setEmpty={setEmpty} />
  );
  return (
    <div className={styles.main_page}>
      <Header />
      {content}
      <Footer />
    </div>
  );
}
