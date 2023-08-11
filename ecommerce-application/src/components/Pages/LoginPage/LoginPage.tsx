import { Header } from '../../common/Header/Header';
import { LoginPageMain } from './LoginPageMain/LoginPageMain';
import styles from './LoginPage.module.css';

export function LoginPage(): React.ReactElement {
  return (
    <div className={styles.loginPage__container}>
      <Header />
      <LoginPageMain />
    </div>
  );
}
