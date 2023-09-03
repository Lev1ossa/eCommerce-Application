import { AiOutlineLock } from 'react-icons/ai';
import styles from './Password.module.scss';
import { PasswordContentActive } from '../PasswordContentActive/PasswordContentActive';

export function Password(): React.ReactElement {
  return (
    <div className={styles.article}>
      <h3 className={styles.title}>
        <AiOutlineLock className={styles.icon} /> Change Password
      </h3>
      <PasswordContentActive styles={styles} />
    </div>
  );
}
