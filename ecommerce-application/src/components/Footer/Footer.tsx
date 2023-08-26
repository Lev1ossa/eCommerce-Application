import styles from './Footer.module.scss';

export function Footer(): React.ReactElement {
  return (
    <div className={styles.footer}>
      <p className={styles.label}>2023 Good Food</p>
    </div>
  );
}
