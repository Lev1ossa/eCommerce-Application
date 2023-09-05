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
