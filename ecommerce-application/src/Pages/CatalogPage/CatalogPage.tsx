import { useParams } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Catalog } from '../../features/catalog';
import styles from './CatalogPage.module.scss';

export function CatalogPage(): React.ReactElement {
  const { categorySlug, subCategorySlug } = useParams();

  return (
    <div className={styles.catalog_page}>
      <Header />
      <Catalog categorySlug={categorySlug} subCategorySlug={subCategorySlug} />
      <Footer />
    </div>
  );
}
