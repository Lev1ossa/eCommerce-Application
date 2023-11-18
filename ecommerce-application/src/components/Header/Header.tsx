import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../../features/autentification';
import logo from '../../assets/img/logo.png';
import styles from './Header.module.scss';
import { Sidebar } from './Sidebar/Sidebar';
import { Nav } from './Nav/Nav';
import { isUserLoggedIn } from '../../api/tokenHandlers';
import { ApiRootContext } from '../../context/ApiRootContext';

export function Header(props: {
  quantityProducts: number | undefined;
}): React.ReactElement {
  const [userLoggedIn, setUserLoggedIn] = useState(isUserLoggedIn());
  const { quantityProducts } = props;
  const refreshTokenFlowApiRoot = useContext(ApiRootContext);
  const navigate = useNavigate();
  const handleRedirect = (): void => {
    if (!isUserLoggedIn()) {
      navigate('/login');
    }
  };
  const logoutHandler = async (): Promise<void> => {
    await handleLogout(refreshTokenFlowApiRoot);
    setUserLoggedIn(isUserLoggedIn());
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
        quantityProducts={quantityProducts}
      />
      <header className={styles.header}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="logo" />
        </Link>
        <Nav
          className={navLinkClass}
          userLoggedIn={userLoggedIn}
          logoutHandler={logoutHandler}
          quantityProducts={quantityProducts}
        />
      </header>
    </>
  );
}
