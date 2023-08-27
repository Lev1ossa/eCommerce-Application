import { ProductCard } from '../ProductCard';
import styles from './Catalog.module.scss';

const testData = [
  {
    id: 1,
    name: 'Orange',
    type: 'fruits',
    category: 'citrus',
    price: 1.37,
    tm: 'Vegan',
    img: '../../assets/orange-1.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, veniam non? Explicabo aut modi magnam quo iste sit illo, veniam est perspiciatis, non dicta a voluptatum consequatur quisquam quam dolores.',
  },
  {
    id: 2,
    name: 'Cherry',
    type: 'fruits',
    category: 'citrus',
    price: 1.32,
    tm: 'Barbados',
    img: '../../assets/orange-1.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, veniam non? Explicabo aut modi magnam quo iste sit illo, veniam est perspiciatis, non dicta a voluptatum consequatur quisquam quam dolores.',
  },
  {
    id: 3,
    name: 'Mango',
    type: 'fruits',
    category: 'citrus',
    price: 1.85,
    tm: 'Barbados',
    img: '../../assets/orange-1.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, veniam non? Explicabo aut modi magnam quo iste sit illo, veniam est perspiciatis, non dicta a voluptatum consequatur quisquam quam dolores.',
  },
  {
    id: 4,
    name: 'Banana',
    type: 'fruits',
    category: 'citrus',
    price: 1.24,
    tm: 'Barbados',
    img: '../../assets/orange-1.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, veniam non? Explicabo aut modi magnam quo iste sit illo, veniam est perspiciatis, non dicta a voluptatum consequatur quisquam quam dolores.',
  },
  {
    id: 5,
    name: 'Strawberry',
    type: 'fruits',
    category: 'citrus',
    price: 1.04,
    tm: 'Vegan',
    img: '../../assets/orange-1.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, veniam non? Explicabo aut modi magnam quo iste sit illo, veniam est perspiciatis, non dicta a voluptatum consequatur quisquam quam dolores.',
  },
  {
    id: 6,
    name: 'Melon',
    type: 'fruits',
    category: 'citrus',
    price: 1.22,
    tm: 'Victoria',
    img: '../../assets/orange-1.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, veniam non? Explicabo aut modi magnam quo iste sit illo, veniam est perspiciatis, non dicta a voluptatum consequatur quisquam quam dolores.',
  },
  {
    id: 7,
    name: 'Apple',
    type: 'fruits',
    category: 'citrus',
    price: 1.43,
    tm: 'Barbados',
    img: '../../assets/orange-1.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, veniam non? Explicabo aut modi magnam quo iste sit illo, veniam est perspiciatis, non dicta a voluptatum consequatur quisquam quam dolores.',
  },
  {
    id: 8,
    name: 'Lemon',
    type: 'fruits',
    category: 'citrus',
    price: 1.74,
    tm: 'Victoria',
    img: '../../assets/orange-1.png',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, veniam non? Explicabo aut modi magnam quo iste sit illo, veniam est perspiciatis, non dicta a voluptatum consequatur quisquam quam dolores.',
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
