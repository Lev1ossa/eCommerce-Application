import { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import styles from './Pagination.module.scss';

// eslint-disable-next-line max-lines-per-function
export function Pagination(props: {
  totalProductsCount: number;
}): React.ReactElement {
  const { totalProductsCount } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const getPagesArray = (count: number): number[] => {
    const pages = [];
    for (let i = 0; i < count; i += 1) {
      pages.push(i + 1);
    }
    return pages;
  };

  const pagesArray = getPagesArray(totalProductsCount / 10);
  const changeCurrentPage = (page: number): void => {
    if (page > 0 && page <= totalProductsCount) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.button}
        onClick={(): void => changeCurrentPage(currentPage - 1)}
      >
        <BsChevronLeft />
      </button>
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
      <button
        type="button"
        className={styles.button}
        onClick={(): void => changeCurrentPage(currentPage + 1)}
      >
        <BsChevronRight />
      </button>
    </div>
  );
}
