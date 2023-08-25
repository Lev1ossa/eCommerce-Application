import { Header } from '../../components/Header/Header';
import { Login } from '../../features/autentification';
import styles from './LoginPage.module.css';

export function LoginPage(): React.ReactElement {
  return (
    <div className={styles.loginPage__container}>
      <Header />
      <Login />
    </div>
  );
}
