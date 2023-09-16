import styles from './AnimationBlock.module.scss';

export function AnimationBlock(): React.ReactElement {
  return (
    <ul className={styles.animation_container}>
      <li className={styles.animation_block} />
      <li className={styles.animation_block} />
      <li className={styles.animation_block} />
      <li className={styles.animation_block} />
      <li className={styles.animation_block} />
      <li className={styles.animation_block} />
      <li className={styles.animation_block} />
      <li className={styles.animation_block} />
      <li className={styles.animation_block} />
      <li className={styles.animation_block} />
    </ul>
  );
}
