import { Product } from '../../features/product';
import styles from './ProductPage.module.scss';

export function ProductPage(): React.ReactElement {
  return (
    <div className={styles.product_page}>
      <Product />
    </div>
  );
}
