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

  const getBrandsFromProducts = (productList: ProductProjection[]): void => {
    const brandsList = productList.map((product: ProductProjection) =>
      product.masterVariant.attributes
        ? product.masterVariant.attributes[0].value
        : 'good food',
    );
    setBrands([...new Set(brandsList.sort())]);
  };
  useEffect(() => {
    // console.log('get products');
    const data = products.map((product) => (
      <li key={product.id} className={styles.item}>
        <ProductCard product={product} />
      </li>
    ));
    setCatalog(data);
    getBrandsFromProducts(products);
    console.log('data', products);
  }, [products]);

  const getFilteredProducts = async (
    ...args: ICurrentFilters[]
  ): Promise<void> => {
    setIsLoading(true);

    const filterQueryStrings = [];
    if (args[0].category)
      filterQueryStrings.push(`categories.id: subtree("${args[0].category}")`);
    if (args[0].trademark)
      filterQueryStrings.push(
        `variants.attributes.trademark:"${args[0].trademark}"`,
      );
    if (args[0].foreigh)
      filterQueryStrings.push(
        `variants.attributes.origin.key:"${args[0].foreigh}"`,
      );
    // console.log('filterQueryStrings', filterQueryStrings);

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
