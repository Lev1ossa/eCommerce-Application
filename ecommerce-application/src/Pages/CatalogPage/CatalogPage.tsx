import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Catalog } from '../../features/catalog';
import styles from './CatalogPage.module.scss';
import { getActiveCart } from '../../api/requests';

export function CatalogPage(): React.ReactElement {
  const { categorySlug, subCategorySlug } = useParams();

  const [quantityProducts, setQuantityProducts] = useState<number>();

  const getCart = (): void => {
    getActiveCart().then(
      (result) => {
        setQuantityProducts(result.body.totalLineItemQuantity);
      },
      (error: Error) => console.log(error),
    );
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className={styles.catalog_page}>
      <Header quantityProducts={quantityProducts} />
      <Catalog categorySlug={categorySlug} subCategorySlug={subCategorySlug} />
      <Footer />
    </div>
  );
}
