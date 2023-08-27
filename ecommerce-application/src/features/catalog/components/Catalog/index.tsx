import { ProductCard } from '../ProductCard';
import styles from './Catalog.module.scss';

const testData = [
  {
    id: 1,
    name: 'Orange',
    type: 'fruits',
    category: 'citrus',
    price: 1.04,
    tm: 'Barbados',
    img: '../../assets/orange-1.png',
  },
  {
    id: 2,
    name: 'Cherry',
    type: 'fruits',
    category: 'citrus',
    price: 1.04,
    tm: 'Barbados',
    img: '../../assets/orange-1.png',
  },
  {
    id: 3,
    name: 'Mango',
    type: 'fruits',
    category: 'citrus',
    price: 1.04,
    tm: 'Barbados',
    img: '../../assets/orange-1.png',
  },
  {
    id: 4,
    name: 'Banana',
    type: 'fruits',
    category: 'citrus',
    price: 1.04,
    tm: 'Barbados',
    img: '../../assets/orange-1.png',
  },
  {
    id: 5,
    name: 'Strawberry',
    type: 'fruits',
    category: 'citrus',
    price: 1.04,
    tm: 'Barbados',
    img: '../../assets/orange-1.png',
  },
  {
    id: 6,
    name: 'Melon',
    type: 'fruits',
    category: 'citrus',
    price: 1.04,
    tm: 'Barbados',
    img: '../../assets/orange-1.png',
  },
  {
    id: 7,
    name: 'Apple',
    type: 'fruits',
    category: 'citrus',
    price: 1.04,
    tm: 'Barbados',
    img: '../../assets/orange-1.png',
  },
  {
    id: 8,
    name: 'Lemon',
    type: 'fruits',
    category: 'citrus',
    price: 1.04,
    tm: 'Barbados',
    img: '../../assets/orange-1.png',
  },
];

export function Catalog(): React.ReactElement {
  const products = testData.map((product) => (
    <li key={product.id} className={styles.item}>
      <ProductCard product={product} />
    </li>
  ));

  return (
    <div className={styles.catalog}>
      <ul className={styles.grid}>{products}</ul>
    </div>
  );
}
