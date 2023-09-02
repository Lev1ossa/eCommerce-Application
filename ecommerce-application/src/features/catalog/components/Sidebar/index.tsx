import styles from './Sidebar.module.scss';

export function Sidebar(): React.ReactElement {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.list}>
        <li>Fruits</li>
        <li>Vegetables</li>
        <li>Berries</li>
      </ul>
    </div>
  );
}
