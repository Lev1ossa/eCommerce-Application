import React from 'react';
import { FiChevronsRight } from 'react-icons/fi';
import styles from './Breadcrumb.module.scss';

export function Breadcrumb(
  props: Record<string, string | undefined>,
): React.ReactElement {
  const propsValuesArr = Object.values(props);
  const dataArr = propsValuesArr.map((el): string | null => {
    if (el) {
      const newStr = el[0].toUpperCase() + el.slice(1);
      return newStr.replace('_', ' ');
    }
    return null;
  });
  const componentsArr = dataArr.map((el, i) => {
    if (i === dataArr.length - 1) {
      return (
        <button className={styles.button} type="button">
          {el}
        </button>
      );
    }
    return (
      <>
        <button className={styles.button} type="button">
          {el}
        </button>
        <FiChevronsRight className={styles.icon} />
      </>
    );
  });
  return <div className={styles.container}>{componentsArr}</div>;
}
