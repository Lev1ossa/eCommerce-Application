import { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { getPagesArray } from '../../utils/utils';
import styles from './Pagination.module.scss';

// eslint-disable-next-line max-lines-per-function
export function Pagination(props: {
  totalProductsCount: number;
}): React.ReactElement {
  const { totalProductsCount } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const pagesArray = getPagesArray(totalProductsCount);

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
