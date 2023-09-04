import { useParams } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Product } from '../../features/product';
import styles from './ProductPage.module.scss';

export function ProductPage(): React.ReactElement {
  const { slug } = useParams();

  return (
    <div className={styles.product_page}>
      <Header />
      {slug && <Product slug={slug} />}
      <Footer />
    </div>
  );
}
