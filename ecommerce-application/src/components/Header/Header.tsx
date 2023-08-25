import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../features/autentification';
import logo from '../../assets/img/logo.png';
import styles from './Header.module.scss';
import Sidebar from './Sidebar/Sidebar';

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
    logout();
    setUserLoggedIn(!!localStorage.getItem('AAA-Ecom-refreshToken'));
    handleRedirect();
  };
  const navLinkClass = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? styles.active : styles.inactive;
  };
  return (
    <>
      <Sidebar
        className={navLinkClass}
        userLoggedIn={userLoggedIn}
        logoutHandler={logoutHandler}
      />
      <header className={styles.header}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="logo" />
        </Link>
        <nav>
          <ul className={styles.links}>
            <li>
              <NavLink className={navLinkClass} to="/">
                Main
              </NavLink>
            </li>
            {!userLoggedIn && (
              <li>
                <NavLink className={navLinkClass} to="/login">
                  Login
                </NavLink>
              </li>
            )}
            {!userLoggedIn && (
              <li>
                <NavLink className={navLinkClass} to="/registration">
                  Registration
                </NavLink>
              </li>
            )}
            {userLoggedIn && (
              <li>
                <NavLink
                  onClick={logoutHandler}
                  className={styles.inactive}
                  to="#"
                >
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}
