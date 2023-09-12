import styles from './NotEmptyBasketContent.module.scss';

export function NotEmptyBasketContent(props: {
  setEmpty: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactElement {
  const { setEmpty } = props;
  const handleH2 = (): void => {
    setEmpty(false);
  };
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <button className={styles.title} onClick={handleH2} type="button">
          NotEmptyBasket
        </button>
      </div>
    </main>
  );
}
