import { Product } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { getProductsList } from '../../../../api/requests';
import { ProductCard } from '../ProductCard';
import { Sidebar } from '../Sidebar';
import styles from './Catalog.module.scss';

// eslint-disable-next-line max-lines-per-function
export function Catalog(): React.ReactElement {
  const [products, setProducts] = useState<Product[]>([]);
  const [catalog, setCatalog] = useState<JSX.Element[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProductsList().then(
      (result) => {
        setProducts(result.body.results);
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  useEffect(() => {
    console.log('products', products);
    const data = products.map((product) => (
      <li key={product.id} className={styles.item}>
        <ProductCard product={product} />
      </li>
    ));
    setCatalog(data);
  }, [products]);

  return (
    <div className={styles.catalog}>
      <Sidebar />
      <ul className={styles.grid}>{!isLoading && catalog}</ul>
    </div>
  );
}
