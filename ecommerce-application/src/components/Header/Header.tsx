import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../../features/autentification';
import logo from '../../assets/img/logo.png';
import styles from './Header.module.scss';
import { Sidebar } from './Sidebar/Sidebar';
import { Nav } from './Nav/Nav';

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
        <Nav
          className={navLinkClass}
          userLoggedIn={userLoggedIn}
          logoutHandler={logoutHandler}
        />
      </header>
    </>
  );
}
