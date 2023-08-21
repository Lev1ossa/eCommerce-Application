import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './Header.module.scss';
import { handleLogout } from '../../../utils/authHandlers';

// eslint-disable-next-line max-lines-per-function
export function Header(): React.ReactElement {
  const [isLogin, changeLoginStatus] = useState(
    !!localStorage.getItem('AAA-Ecom-refreshToken'),
  );
  const navigate = useNavigate();
  const handleRedirect = (): void => {
    if (localStorage.getItem('AAA-Ecom-refreshToken')) {
      navigate('/');
    }
  };
  const onClick = (): void => {
    handleLogout();
    changeLoginStatus(!!localStorage.getItem('AAA-Ecom-refreshToken'));
    handleRedirect();
  };
  return (
    <header className={styles.header}>
      <Link to="/">
        <h1>Ecommerce-application</h1>
      </Link>
      <nav>
        {isLogin ? (
          <ul>
            <li>
              <button
                type="button"
                className={`${styles.button} ${styles.button_red}`}
                onClick={onClick}
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
