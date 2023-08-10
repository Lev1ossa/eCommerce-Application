import styles from './Header.module.css';

function Header(): React.ReactElement {
  return (
    <header className={styles.header}>
      <h1>Ecommerce-application</h1>
      <nav>
        <ul>
          <li>
            <a href="/#">Login</a>
          </li>
          <li>
            <a href="/#">Registration</a>
          </li>
          <li>
            <a href="/#">Exit</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export { Header };
