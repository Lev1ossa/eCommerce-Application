import styles from './Product.module.scss';

export function Product(): React.ReactElement {
  return (
    <div className={styles.product}>
      <div className={styles.container}>
        <div className={styles.slider}>SLIDER</div>
        <div className={styles.details}>
          <div className={styles.name}>Lorem ipsum dolor sit.</div>
          <div className={styles.price}>$ 1.55</div>
          <div className={styles.category}>Citrus</div>
          <div className={styles.trademark}>Victoria</div>
          <button type="button" className={styles.button}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
