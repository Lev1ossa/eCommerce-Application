import styles from './NotFoundPageMain.module.scss';

export function NotFoundPageMain(): React.ReactElement {
  return (
    <main className={styles.container}>
      <ul className={styles.colors}>
        <li className={styles.colors_one} />
        <li className={styles.colors_two} />
        <li className={styles.colors_three} />
        <li className={styles.colors_four} />
      </ul>
      <div className={styles.content}>
        <h1>404</h1>
      </div>
    </main>
  );
}
