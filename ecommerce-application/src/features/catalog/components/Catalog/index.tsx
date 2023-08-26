import { Card } from '../Card';
import styles from './Catalog.module.scss';

const testData = [
  {
    id: 1,
    name: 'Orange',
    type: 'fruits',
    category: 'citrus',
    price: 1.0,
    tm: 'Barbados',
    img: '../../assets/orange-1.png',
  },
  {
    id: 2,
    name: 'Orange',
    type: 'fruits',
    category: 'citrus',
    price: 1.0,
    tm: 'Barbados',
    img: '../../assets/orange-1.png',
  },
  {
    id: 3,
    name: 'Orange',
    type: 'fruits',
    category: 'citrus',
    price: 1.0,
    tm: 'Barbados',
    img: '../../assets/orange-1.png',
  },
  {
    id: 4,
    name: 'Orange',
    type: 'fruits',
    category: 'citrus',
    price: 1.0,
    tm: 'Barbados',
    img: '../../assets/orange-1.png',
  },
  {
    id: 5,
    name: 'Orange',
    type: 'fruits',
    category: 'citrus',
    price: 1.0,
    tm: 'Barbados',
    img: '../../assets/orange-1.png',
  },
];

export function Catalog(): React.ReactElement {
  const products = testData.map((product) => (
    <li key={product.id} className={styles.item}>
      <Card product={product} />
    </li>
  ));

  return (
    <div className={styles.catalog}>
      <ul className={styles.grid}>{products}</ul>
    </div>
  );
}
