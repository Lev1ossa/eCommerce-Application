import { PRODUCTS_ON_PAGE_LIMIT } from '../../../constants/constants';
import { CustomCategory } from '../../../types/types';

export const getStartCategoryID = (
  categoryTree: CustomCategory[],
  categorySlug: string | undefined,
  subCategorySlug: string | undefined,
): string => {
  for (let i = 0; i < categoryTree.length; i += 1) {
    for (let j = 0; j < categoryTree[i].children.length; j += 1) {
      if (categoryTree[i].children[j].slug === subCategorySlug) {
        return categoryTree[i].children[j].id;
      }
    }
    if (categoryTree[i].slug === categorySlug) {
      return categoryTree[i].id;
    }
  }

  return '';
};

export const getPagesArray = (count: number): number[] => {
  if (!count) return [1];
  const pagesCount = Math.ceil(count / PRODUCTS_ON_PAGE_LIMIT);
  const pages = [];
  for (let i = 0; i < pagesCount; i += 1) {
    pages.push(i + 1);
  }
  return pages;
};
