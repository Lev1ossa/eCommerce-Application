import styles from './Product.module.scss';

export function Product(): React.ReactElement {
  return (
    <div className={styles.product}>
      <div className={styles.container}>
        <div className={styles.slider}>SLIDER</div>
        <div className={styles.details}>
          <div className={styles.name}>name</div>
          <div className={styles.price}>$ price</div>
          <div className={styles.category}>category</div>
          <div className={styles.trademark}>tm</div>
          <button type="button" className={styles.button}>
            Add to cart
          </button>
          <div className={styles.description}>
            <strong>Description: </strong> description
          </div>
        </div>
      </div>
    </div>
  );
}
