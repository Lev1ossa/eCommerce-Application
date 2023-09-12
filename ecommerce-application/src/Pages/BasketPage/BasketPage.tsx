import { useState } from 'react';
import { Header } from '../../components/Header/Header';
import styles from './BasketPage.module.scss';
import { Footer } from '../../components/Footer/Footer';
import { NotEmptyBasketContent } from '../../features/basket/components/NotEmptyBasketContent/NotEmptyBasketContent';
import { EmptyBasketContent } from '../../features/basket/components/EmptyBasketContent/EmptyBasketContent';
import { IItemData } from '../../types/types';

const itemDataArr: IItemData[] = [
  {
    id: '1111111',
    name: 'Banana',
    image:
      'https://raw.githubusercontent.com/Lev1ossa/ecom-data/main/assets/berries/blackberries/blackberries-1.png',
    price: 500,
    discountedPrice: 400,
    quantity: 2,
    totalPrice: 1000,
    totalPriceDiscounted: 800,
  },
  {
    id: '2222222',
    name: 'Apple',
    image:
      'https://raw.githubusercontent.com/Lev1ossa/ecom-data/main/assets/berries/melon/melon-1.png',
    price: 200,
    discountedPrice: 100,
    quantity: 3,
    totalPrice: 600,
    totalPriceDiscounted: 300,
  },
];

export function BasketPage(): React.ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isEmpty, setEmpty] = useState(!itemDataArr);

  const content = isEmpty ? (
    <EmptyBasketContent />
  ) : (
    <NotEmptyBasketContent cartItemsData={itemDataArr} />
  );
  return (
    <div className={styles.main_page}>
      <Header />
      {content}
      <Footer />
    </div>
  );
}
