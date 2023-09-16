import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { AboutUsContent } from '../../features/aboutUs/components/AboutUsContent';
import styles from './AboutUsPage.module.scss';

export function AboutUsPage(): React.ReactElement {
  return (
    <div className={styles.main_page}>
      <Header />
      <AboutUsContent />
      <Footer />
    </div>
  );
}
