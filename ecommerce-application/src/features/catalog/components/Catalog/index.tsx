import { ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import {
  getCategories,
  getFilteredProductList,
  getProductsList,
} from '../../../../api/requests';
import { Loader } from '../../../../components/Loader';
import { CustomCategory, ICurrentFilters } from '../../../../types/types';
import { Breadcrumb } from '../../../breadcrumb/components/Breadcrumps/Breadcrumb';
import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';
import { CatalogSidebar } from '../Sidebar';
import styles from './Catalog.module.scss';

// eslint-disable-next-line max-lines-per-function
export function Catalog(props: {
  categorySlug: string | undefined;
  subCategorySlug: string | undefined;
}): React.ReactElement {
  const { categorySlug, subCategorySlug } = props;
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState<string[]>([]);
  const [productCategories, setProductCategories] = useState<CustomCategory[]>(
    [],
  );
  const [currentFilters, setcurrentFilters] = useState<
    Partial<ICurrentFilters>
  >({});

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
      (error: Error) => {
        console.log(error);
      },
    );
  }, []);

  useEffect(() => {
    getCategories().then(
      (result) => {
        const categories: CustomCategory[] = result.body.results.map(
          (category) => {
            const newCategory: CustomCategory = {
              id: category.id,
              parentID: category.parent?.id,
              key: category.key,
              slug: category.slug.en,
              name: category.name.en,
              children: [],
            };
            return newCategory;
          },
        );
        const categoriesTree = categories.filter(
          (category) => !category.parentID,
        );
        categories
          .filter((category) => category.parentID)
          .forEach((subcategory) => {
            const parentIdx = categoriesTree.findIndex(
              (item) => item.id === subcategory.parentID,
            );
            if (parentIdx !== -1) {
              categoriesTree[parentIdx].children.push(subcategory);
            }
          });
        setProductCategories(categoriesTree);
        setIsLoading(false);
      },
      (error: Error) => {
        console.log(error);
      },
    );
  }, []);

  const catalog = products
    ? products.map((product) => (
        <li key={product.id} className={styles.item}>
          <ProductCard product={product} />
        </li>
      ))
    : [<h1 key={0}>No Products Found</h1>];

  // eslint-disable-next-line max-lines-per-function
  const getFilteredProducts = async (
    filters: Partial<ICurrentFilters>,
  ): Promise<void> => {
    setIsLoading(true);
    const sortQueryStrings: string[] = [];
    const filterQueryStrings: string[] = [];
    let searchQueryString = '';

    if (filters.category)
      filterQueryStrings.push(`categories.id: subtree("${filters.category}")`);
    if (filters.trademark && filters.trademark.join(''))
      filterQueryStrings.push(
        `variants.attributes.trademark:${filters.trademark
          .map((filter: string): string => `"${filter}"`)
          .join(',')}`,
      );
    if (filters.originFilter && filters.originFilter.join(''))
      filterQueryStrings.push(
        `variants.attributes.origin.key:${filters.originFilter
          .map((filter: string): string => `"${filter}"`)
          .join(',')}`,
      );
    if (filters.lowerPrice && filters.higherPrice) {
      filterQueryStrings.push(
        `variants.price.centAmount:range (${+filters.lowerPrice * 100} to ${
          +filters.higherPrice * 100
        })`,
      );
    }
    if (filters.lowerPrice) {
      filterQueryStrings.push(
        `variants.price.centAmount:range (${
          +filters.lowerPrice * 100
        } to 100000)`,
      );
    }
    if (filters.higherPrice) {
      filterQueryStrings.push(
        `variants.price.centAmount:range (0 to ${+filters.higherPrice * 100})`,
      );
    }
    if (!filters.lowerPrice && !filters.higherPrice) {
      filterQueryStrings.push(`variants.price.centAmount:range (0 to 10000)`);
    }

    if (filters.sort) {
      sortQueryStrings.push(filters.sort);
    }
    if (filters.search) {
      searchQueryString = filters.search;
    }
    await getFilteredProductList(
      filterQueryStrings,
      sortQueryStrings,
      searchQueryString,
    ).then(
      (result) => {
        setProducts(result.body.results);
        setIsLoading(false);
      },
      (error: Error) => {
        console.log(error);
        setIsLoading(false);
      },
    );
  };

  useEffect(() => {
    getFilteredProducts(currentFilters);
  }, [currentFilters]);

  return (
    <>
      <Breadcrumb
        categorySlug={categorySlug}
        subCategorySlug={subCategorySlug}
      />
      <div className={styles.catalog}>
        <CatalogSidebar
          setcurrentFilters={setcurrentFilters}
          productCategories={productCategories}
          brands={brands}
          categorySlug={categorySlug}
          subCategorySlug={subCategorySlug}
        />
        <ul className={styles.grid}>{!isLoading ? catalog : <Loader />}</ul>
        <Pagination />
      </div>
    </>
  );
}
