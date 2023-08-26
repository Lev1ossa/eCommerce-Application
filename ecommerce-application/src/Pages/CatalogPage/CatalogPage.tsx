import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Catalog } from '../../features/catalog';
import styles from './CatalogPage.module.scss';

export function CatalogPage(): React.ReactElement {
  return (
    <div className={styles.catalog_page}>
      <Header />
      <Catalog />
      <Footer />
    </div>
  );
}
