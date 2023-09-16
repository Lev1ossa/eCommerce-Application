import { ProductProjection } from '@commercetools/platform-sdk';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';

export function ProductList(props: {
  products: ProductProjection[];
}): React.ReactElement {
  const { products } = props;
  return (
    <ul className={styles.grid}>
      {products.map((product) => (
        <li key={product.id} className={styles.item}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
