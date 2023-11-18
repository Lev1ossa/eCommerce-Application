import { BiLoader } from 'react-icons/bi';
import styles from './ButtonLoader.module.scss';

export function ButtonLoader(): React.ReactElement {
  return <BiLoader className={styles.loader} />;
}
