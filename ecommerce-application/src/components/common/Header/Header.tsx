import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export function Header(): React.ReactElement {
  return (
    <header className={styles.header}>
      <Link to="/">
        <h1>Ecommerce-application</h1>
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
            <button type="button">Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
