import styles from './Loader.module.scss';

export function Loader(): React.ReactElement {
  const loaderImg = new URL('../../assets/img/spin.png', import.meta.url).href;
  return (
    <div className={styles.loader}>
      <img className={styles.image} src={loaderImg} alt="loader" />
    </div>
  );
}
