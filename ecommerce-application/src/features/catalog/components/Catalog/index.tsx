import { ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import {
  getFilteredProductList,
  getProductsList,
} from '../../../../api/requests';
import { Loader } from '../../../../components/Loader';
import { ICurrentFilters } from '../../../../types/types';
import { ProductCard } from '../ProductCard';
import { CatalogSidebar } from '../Sidebar';
import styles from './Catalog.module.scss';

// eslint-disable-next-line max-lines-per-function
export function Catalog(): React.ReactElement {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [catalog, setCatalog] = useState<JSX.Element[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState<string[]>([]);

  const getBrandsFromProducts = (productList: ProductProjection[]): void => {
    const brandsList = productList.map((product: ProductProjection) =>
      product.masterVariant.attributes
        ? product.masterVariant.attributes[0].value
        : 'good food',
    );
    setBrands([...new Set(brandsList.sort())]);
  };

  useEffect(() => {
    getProductsList().then(
      (result) => {
        setProducts(result.body.results);
        setIsLoading(false);
        getBrandsFromProducts(result.body.results);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  useEffect(() => {
    const data = products.map((product) => (
      <li key={product.id} className={styles.item}>
        <ProductCard product={product} />
      </li>
    ));
    if (data.length) {
      setCatalog(data);
    } else setCatalog([<h1 key={0}>Not found</h1>]);
    console.log('data', products);
  }, [products]);

  const getFilteredProducts = async (
    ...args: ICurrentFilters[]
  ): Promise<void> => {
    setIsLoading(true);
    console.log('args', args);
    const filterQueryStrings: string[] = [];
    if (args[0].category.length)
      filterQueryStrings.push(`categories.id: subtree("${args[0].category}")`);
    if (args[0].trademark.length)
      filterQueryStrings.push(
        `variants.attributes.trademark:${args[0].trademark
          .map((filter: string): string => `"${filter}"`)
          .join(',')}`,
      );
    if (args[0].originFilter.length)
      filterQueryStrings.push(
        `variants.attributes.origin.key:${args[0].originFilter
          .map((filter: string): string => `"${filter}"`)
          .join(',')}`,
      );
    console.log('filterQueryStrings', filterQueryStrings);
    await getFilteredProductList(filterQueryStrings).then(
      (result) => {
        setProducts(result.body.results);
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  return (
    <div className={styles.catalog}>
      <CatalogSidebar categoryFilter={getFilteredProducts} brands={brands} />
      <ul className={styles.grid}>{!isLoading ? catalog : <Loader />}</ul>
    </div>
  );
}
