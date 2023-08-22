import { Header } from '../../common/Header/Header';
import { RegistrationPageMain } from './RegistrationPageMain/RegistrationPageMain';
import styles from './RegistrationPage.module.css';

export function RegistrationPage(): React.ReactElement {
  return (
    <div className={styles.registrationPage__container}>
      <Header />
      <RegistrationPageMain />
    </div>
  );
}
