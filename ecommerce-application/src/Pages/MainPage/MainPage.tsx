import { NavLink } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import styles from './MainPage.module.scss';
import { Footer } from '../../components/Footer/Footer';

// eslint-disable-next-line max-lines-per-function
export function MainPage(): React.ReactElement {
  return (
    <div className={styles.main_page}>
      <Header />
      <main className={styles.main}>
        <ul className={styles.links}>
          <li>
            <NavLink className={styles.link} to="/">
              Main
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/login">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/registration">
              Registration
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/catalog">
              Catalog
            </NavLink>
          </li>
        </ul>
      </main>
      <Footer />
    </div>
  );
}
