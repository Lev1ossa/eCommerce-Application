import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { LoginForm } from '../../features/autentification';
import styles from './LoginPage.module.css';

export function LoginPage(): React.ReactElement {
  return (
    <div className={styles.login_page}>
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
}
