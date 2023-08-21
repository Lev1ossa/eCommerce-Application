import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { handleLogout } from '../../../utils/authHandlers';
import logo from '../../../assets/img/logo.png';
import styles from './Header.module.scss';

// eslint-disable-next-line max-lines-per-function
export function Header(): React.ReactElement {
  const [userLoggedIn, setUserLoggedIn] = useState(
    !!localStorage.getItem('AAA-Ecom-refreshToken'),
  );
  const navigate = useNavigate();
  const handleRedirect = (): void => {
    if (localStorage.getItem('AAA-Ecom-refreshToken')) {
      navigate('/');
    }
  };
  const logoutHandler = (): void => {
    handleLogout();
    setUserLoggedIn(!!localStorage.getItem('AAA-Ecom-refreshToken'));
    handleRedirect();
  };
  return (
    <header className={styles.header}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="logo" />
      </Link>
      <nav>
        {userLoggedIn ? (
          <ul>
            <li>
              <button
                type="button"
                className={`${styles.button} ${styles.button_red}`}
                onClick={logoutHandler}
              >
                LOGOUT
              </button>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/login">
                <span className={`${styles.button} ${styles.button_green}`}>
                  LOGIN
                </span>
              </Link>
            </li>
            <li>
              <Link to="/registration">
                <span className={`${styles.button} ${styles.button_green}`}>
                  REGISTRATION
                </span>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
