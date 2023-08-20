import { Link } from 'react-router-dom';
import styles from './NotFoundPageMain.module.scss';

// eslint-disable-next-line max-lines-per-function
export function NotFoundPageMain(): React.ReactElement {
  return (
    <main className={styles.container}>
      <ul className={styles.colors}>
        <li className={styles.colors_one} />
        <li className={styles.colors_two} />
        <li className={styles.colors_three} />
        <li className={styles.colors_four} />
      </ul>
      <div className={styles.page_content}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.logo}>Logo</div>
              <nav className={styles.nav}>
                <ul className={styles.links}>
                  <Link to="/">
                    <li>Home</li>
                  </Link>
                  <Link to="/login">
                    <li>Login</li>
                  </Link>
                  <Link to="/registration">
                    <li>Registration</li>
                  </Link>
                </ul>
              </nav>
            </div>
            <div className={styles.main}>
              <div className={styles.message}>
                <div className={styles.message_content}>
                  <div className={styles.error}>404</div>
                  <div className={styles.title}>Something went wrong!</div>
                  <Link to="/">
                    <button className={styles.button} type="button">
                      Back to Homepage
                    </button>
                  </Link>
                </div>
              </div>
              <div className={styles.image} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
