import { IUserData } from '../../../../types/types';
import styles from './Account.module.scss';

export function Account(props: { userData: IUserData }): React.ReactElement {
  const { userData } = props;
  return (
    <div className={styles.article}>
      <h3 className={styles.title}>Account</h3>
      <div className={styles.info_block}>
        <div className={styles.label}>First name:</div>
        <div className={styles.text}>{userData.firstName}</div>
      </div>
      <div className={styles.info_block}>
        <div className={styles.label}>Last name:</div>
        <div className={styles.text}>{userData.lastName}</div>
      </div>
      <div className={styles.info_block}>
        <div className={styles.label}>Date of birth:</div>
        <div className={styles.text}>{userData.dateOfBirth}</div>
      </div>
      <div className={styles.info_block}>
        <div className={styles.label}>Email:</div>
        <div className={styles.text}>{userData.email}</div>
      </div>
      <div className={styles.info_block}>
        <div className={styles.label}>Password:</div>
        <div className={styles.text}>{userData.password}</div>
      </div>
    </div>
  );
}
