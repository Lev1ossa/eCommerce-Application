import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Product } from '../../features/product';
import styles from './ProductPage.module.scss';
import { getActiveCart } from '../../api/requests';

export function ProductPage(): React.ReactElement {
  const { categorySlug, subCategorySlug, slug } = useParams();

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
