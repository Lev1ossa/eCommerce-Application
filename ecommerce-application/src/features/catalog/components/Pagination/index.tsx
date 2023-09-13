import { useState } from 'react';
import styles from './Pagination.module.scss';

// eslint-disable-next-line max-lines-per-function
export function Pagination(): React.ReactElement {
  const [currentPage, setCurrentPage] = useState(1);
  const countOfPages = 5;

  const getPagesArray = (count: number): number[] => {
    const pages = [];
    for (let i = 0; i < count; i += 1) {
      pages.push(i + 1);
    }
    return pages;
  };

  const pagesArray = getPagesArray(countOfPages);
  const changeCurrentPage = (page: number): void => {
    setCurrentPage(page);
  };
  return (
    <div className={styles.pagination}>
      {pagesArray.map((page): React.ReactElement => {
        return (
          <button
            key={page}
            type="button"
            className={
              page === currentPage
                ? `${styles.button} ${styles.button_active}`
                : styles.button
            }
            onClick={(): void => changeCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
