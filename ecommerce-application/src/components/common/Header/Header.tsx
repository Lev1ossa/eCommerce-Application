import { Link } from 'react-router-dom';
import logo from '../../../assets/img/logo.png';
import { handleLogout } from '../../../utils/authHandlers';
import styles from './Header.module.css';

export function Header(): React.ReactElement {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="logo" />
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
          <li>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
