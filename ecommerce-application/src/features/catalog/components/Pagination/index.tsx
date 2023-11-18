import { useEffect } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { getPagesArray } from '../../utils/utils';
import styles from './Pagination.module.scss';

export function Pagination(props: {
  totalProductsCount: number;
  setProductOffset: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}): React.ReactElement {
  const { currentPage, setCurrentPage, setProductOffset, totalProductsCount } =
    props;
  const baseOffset = 10;
  const pagesArray = getPagesArray(totalProductsCount);

  const changeCurrentPage = (page: number): void => {
    if (page > 0 && page <= pagesArray.length) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const offset = currentPage * baseOffset - baseOffset;
    setProductOffset(totalProductsCount < offset ? 0 : offset);
    setCurrentPage(currentPage > pagesArray.length ? 1 : currentPage);
  }, [
    currentPage,
    setCurrentPage,
    setProductOffset,
    totalProductsCount,
    pagesArray.length,
  ]);

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
