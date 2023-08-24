import { Header } from '../../components/Header/Header';
import { Registration } from '../../features/autentification';
import styles from './RegistrationPage.module.css';

export function RegistrationPage(): React.ReactElement {
  return (
    <div className={styles.registrationPage__container}>
      <Header />
      <Registration />
    </div>
  );
}
