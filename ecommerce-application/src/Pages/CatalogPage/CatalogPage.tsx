import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Catalog } from '../../features/catalog';
import styles from './CatalogPage.module.scss';
import { CartContext } from '../../context/CartContext';

export function CatalogPage(): React.ReactElement {
  const { categorySlug, subCategorySlug } = useParams();

  const [quantityProducts, setQuantityProducts] = useState<number>();
  const cartContext = useContext(CartContext);

  const getCart = (cartItemsCount: number): void => {
    setQuantityProducts(cartItemsCount);
  };

  useEffect(() => {
    getCart(cartContext.getCartItemsCount());
  }, [cartContext]);

  return (
    <div className={styles.catalog_page}>
      <Header quantityProducts={quantityProducts} />
      <Catalog categorySlug={categorySlug} subCategorySlug={subCategorySlug} />
      <Footer />
    </div>
  );
}
