import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Profile } from '../../features/profile';
import styles from './Profile.module.scss';

export function ProfilePage(): React.ReactElement {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Profile />
      <Footer />
    </div>
  );
}
