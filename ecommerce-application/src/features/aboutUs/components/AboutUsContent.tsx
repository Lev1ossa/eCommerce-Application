import styles from './AboutUsContent.module.scss';

export function AboutUsContent(): React.ReactElement {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <h2 className={styles.page_title}>Lorem ipsum dolor sit amet.</h2>
        </div>
        <div className={styles.content_block}>
          <div className={styles.block}>
            <h2 className={styles.title}>Lorem ipsum dolor sit amet.</h2>
            <p className={styles.text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              sequi eum voluptate asperiores, rem ad aut molestiae dolor facere
              libero iste maiores. Delectus rerum quisquam consectetur at.
              Distinctio illo voluptate fugit vitae similique reprehenderit
              mollitia ipsum, culpa dignissimos ex animi ut qui, vel facere
              ratione. Nobis, voluptas corporis? Provident, reprehenderit.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
