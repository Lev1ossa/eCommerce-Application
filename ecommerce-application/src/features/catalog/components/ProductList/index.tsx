import { ProductProjection } from '@commercetools/platform-sdk';
import { useState } from 'react';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';

export function ProductList(props: {
  products: ProductProjection[];
}): React.ReactElement {
  const { products } = props;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ul className={styles.grid}>
      {products.map((product) => (
        <li key={product.id} className={styles.item}>
          <ProductCard
            product={product}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </li>
      ))}
    </ul>
  );
}
