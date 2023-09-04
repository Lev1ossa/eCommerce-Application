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
    } else setCatalog([<h1 key={0}>No Products Found</h1>]);
  }, [products]);

  // eslint-disable-next-line max-lines-per-function
  const getFilteredProducts = async (
    ...args: ICurrentFilters[]
  ): Promise<void> => {
    setIsLoading(true);

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
    if (args[0].lowerPrice && args[0].higherPrice)
      filterQueryStrings.push(
        `variants.price.centAmount:range (${args[0].lowerPrice * 100} to ${
          args[0].higherPrice * 100
        })`,
      );
    const sortQueryStrings: string[] = [];
    if (args[0].sort) {
      sortQueryStrings.push(args[0].sort);
    }
    // const sortQueryStrings = [
    //   'price asc',
    //   'name.en asc',
    //   'variants.attributes.origin.key asc',
    //   'variants.attributes.trademark desc',
    // ];
    await getFilteredProductList(filterQueryStrings, sortQueryStrings).then(
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
