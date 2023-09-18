import { BiLoaderAlt } from 'react-icons/bi';
import styles from './ButtonLoader.module.scss';

export function ButtonLoader(): React.ReactElement {
  return <BiLoaderAlt className={styles.loader} />;
}
