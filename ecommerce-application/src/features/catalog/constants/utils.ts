import { CustomCategory } from '../../../types/types';

export const getStartCategoryID = (
  categoryTree: CustomCategory[],
  categorySlug: string | undefined,
  subCategorySlug: string | undefined,
): string => {
  console.log(categoryTree, categorySlug, subCategorySlug);
  for (let i = 0; i < categoryTree.length; i += 1) {
    for (let j = 0; j < categoryTree[i].children.length; j += 1) {
      if (categoryTree[i].children[j].slug === subCategorySlug) {
        console.log('HEY CHILDREN');
        return categoryTree[i].children[j].id;
      }
    }
    if (categoryTree[i].slug === categorySlug) {
      console.log('HEY PARENT');
      return categoryTree[i].id;
    }
  }

  return '';
};
