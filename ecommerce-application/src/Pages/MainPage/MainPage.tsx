import { NavLink } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import styles from './MainPage.module.scss';

export function MainPage(): React.ReactElement {
  return (
    <div>
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
    </div>
  );
}
