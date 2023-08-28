import { IUserData } from '../../../../types/types';

export function AccountContentActive(props: {
  styles: CSSModuleClasses;
  userData: IUserData;
}): React.ReactElement {
  const { styles, userData } = props;
  return (
    <>
      <div className={styles.info_block}>
        <div className={styles.label}>First nameeeeeeeee:</div>
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
    </>
  );
}
