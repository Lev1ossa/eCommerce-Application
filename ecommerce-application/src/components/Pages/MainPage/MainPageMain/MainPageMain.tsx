import { NavLink } from 'react-router-dom';

import styles from './MainPageMain.module.scss';

export function MainPageMain(): React.ReactElement {
  return (
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
      </ul>
    </main>
  );
}
