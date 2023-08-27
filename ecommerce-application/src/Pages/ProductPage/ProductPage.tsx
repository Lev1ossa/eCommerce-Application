import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Product } from '../../features/product';
import styles from './ProductPage.module.scss';

export function ProductPage(): React.ReactElement {
  return (
    <div className={styles.product_page}>
      <Header />
      <Product />
      <Footer />
    </div>
  );
}
