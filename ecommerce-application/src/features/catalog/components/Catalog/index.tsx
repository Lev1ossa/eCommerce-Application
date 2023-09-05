import { ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import {
  getFilteredProductList,
  getProductsList,
  getCategories,
} from '../../../../api/requests';
import { Loader } from '../../../../components/Loader';
import { CustomCategory, ICurrentFilters } from '../../../../types/types';
import { ProductCard } from '../ProductCard';
import { CatalogSidebar } from '../Sidebar';
import styles from './Catalog.module.scss';
import { Breadcrumb } from '../../../breadcrumb/components/Breadcrumps/Breadcrumb';

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
  const [currentFilters, setcurrentFilters] = useState<ICurrentFilters>({
    category: '',
    trademark: [],
    originFilter: [],
    lowerPrice: 0,
    higherPrice: 0,
    sort: '',
    search: '',
  });

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
    сurrentFilters: ICurrentFilters,
  ): Promise<void> => {
    setIsLoading(true);
    const sortQueryStrings: string[] = [];
    const filterQueryStrings: string[] = [];
    let searchQueryString = '';

    if (сurrentFilters.category)
      filterQueryStrings.push(
        `categories.id: subtree("${сurrentFilters.category}")`,
      );
    if (сurrentFilters.trademark && сurrentFilters.trademark.join(''))
      filterQueryStrings.push(
        `variants.attributes.trademark:${сurrentFilters.trademark
          .map((filter: string): string => `"${filter}"`)
          .join(',')}`,
      );
    if (сurrentFilters.originFilter && сurrentFilters.originFilter.join(''))
      filterQueryStrings.push(
        `variants.attributes.origin.key:${сurrentFilters.originFilter
          .map((filter: string): string => `"${filter}"`)
          .join(',')}`,
      );
    if (сurrentFilters.higherPrice >= 0 && сurrentFilters.lowerPrice >= 0)
      filterQueryStrings.push(
        `variants.price.centAmount:range (${
          сurrentFilters.lowerPrice * 100
        } to ${сurrentFilters.higherPrice * 100})`,
      );
    if (сurrentFilters.sort) {
      sortQueryStrings.push(сurrentFilters.sort);
    }
    if (сurrentFilters.search) {
      searchQueryString = сurrentFilters.search;
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
      (error) => {
        console.log(error);
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
      </div>
    </>
  );
}
