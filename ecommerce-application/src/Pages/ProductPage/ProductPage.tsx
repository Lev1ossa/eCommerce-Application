import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Product } from '../../features/product';
import styles from './ProductPage.module.scss';
import { CartContext } from '../../context/CartContext';

export function ProductPage(): React.ReactElement {
  const { categorySlug, subCategorySlug, slug } = useParams();

  const [quantityProducts, setQuantityProducts] = useState<number>();
  const cartContext = useContext(CartContext);

  const getCart = (cartItemsCount: number): void => {
    setQuantityProducts(cartItemsCount);
  };

  useEffect(() => {
    getCart(cartContext.getCartItemsCount());
  }, [cartContext]);

  return (
    <div className={styles.product_page}>
      <Header quantityProducts={quantityProducts} />
      {slug && categorySlug && subCategorySlug && (
        <Product
          categorySlug={categorySlug}
          subCategorySlug={subCategorySlug}
          slug={slug}
        />
      )}
      <Footer />
    </div>
  );
}
