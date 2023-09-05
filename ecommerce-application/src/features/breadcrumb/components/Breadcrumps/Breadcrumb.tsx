import React from 'react';
import { FiChevronsRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styles from './Breadcrumb.module.scss';

// eslint-disable-next-line max-lines-per-function
export function Breadcrumb(props: Record<string, string>): React.ReactElement {
  const { categorySlug, subCategorySlug, slug } = props;
  const navigate = useNavigate();

  const handleRedirect = (redirectPath: string) => (): void => {
    navigate(`${redirectPath}`);
  };

  const categoryName = (
    categorySlug[0].toUpperCase() + categorySlug.slice(1)
  ).replace('_', ' ');
  const subcategoryName = (
    subCategorySlug[0].toUpperCase() + subCategorySlug.slice(1)
  ).replace('_', ' ');
  const productName = (slug[0].toUpperCase() + slug.slice(1)).replace('_', ' ');

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        type="button"
        onClick={handleRedirect(`/catalog`)}
      >
        Catalog
      </button>
      <FiChevronsRight className={styles.icon} />
      <button
        className={styles.button}
        type="button"
        onClick={handleRedirect(`/catalog/${categorySlug}`)}
      >
        {categoryName}
      </button>
      <FiChevronsRight className={styles.icon} />
      <button
        className={styles.button}
        type="button"
        onClick={handleRedirect(`/catalog/${categorySlug}/${subCategorySlug}`)}
      >
        {subcategoryName}
      </button>
      <FiChevronsRight className={styles.icon} />
      <button
        className={styles.button}
        type="button"
        onClick={handleRedirect(
          `/catalog/${categorySlug}/${subCategorySlug}/${slug}`,
        )}
      >
        {productName}
      </button>
    </div>
  );
}

// const propsValuesArr = Object.values(props);
//   const dataArr = propsValuesArr.map((el): string | null => {
//     if (el) {
//       const newStr = el[0].toUpperCase() + el.slice(1);
//       return newStr.replace('_', ' ');
//     }
//     return null;
//   });
//   const componentsArr = dataArr.map((el, i) => {
//     if (i === dataArr.length - 1) {
//       return (
//         <button className={styles.button} type="button">
//           {el}
//         </button>
//       );
//     }
//     return (
//       <>
//         <button className={styles.button} type="button">
//           {el}
//         </button>
//         <FiChevronsRight className={styles.icon} />
//       </>
//     );
//   });
// return <div className={styles.container}>{componentsArr}</div>;
