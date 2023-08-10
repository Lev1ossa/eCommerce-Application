import styles from './Header.module.css';

export function Header(): React.ReactElement {
  return (
    <header className={styles.header}>
      <a href="/#">
        <h1>Ecommerce-application</h1>
      </a>
      <nav>
        <ul>
          <li>
            <a href="/#">Login</a>
          </li>
          <li>
            <a href="/#">Registration</a>
          </li>
          <li>
            <a href="/#">Logout</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
