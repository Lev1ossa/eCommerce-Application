import { Catalog } from '../../features/catalog';
import styles from './CatalogPage.module.scss';

export function CatalogPage(): React.ReactElement {
  return (
    <div className={styles.catalog_page}>
      <Catalog />
    </div>
  );
}
