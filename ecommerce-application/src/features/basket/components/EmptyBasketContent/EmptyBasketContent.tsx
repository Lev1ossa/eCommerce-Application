import styles from './EmptyBasketContent.module.scss';

export function EmptyBasketContent(): React.ReactElement {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <button className={styles.title} type="button">
          EmptyBasket
        </button>
      </div>
    </main>
  );
}
