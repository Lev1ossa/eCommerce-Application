import { Customer } from '@commercetools/platform-sdk';
import { changeDateView } from '../../../autentification/utils/utils';

export function AccountContentInactive(props: {
  styles: CSSModuleClasses;
  userData: Customer;
}): React.ReactElement {
  const { styles, userData } = props;
  const dateOfBirthValue = changeDateView(userData?.dateOfBirth);
  return (
    <>
      <div className={styles.info_block}>
        <div className={styles.label}>First Name:</div>
        <div className={styles.text}>{userData.firstName}</div>
      </div>
      <div className={styles.info_block}>
        <div className={styles.label}>Last Name:</div>
        <div className={styles.text}>{userData.lastName}</div>
      </div>
      <div className={styles.info_block}>
        <div className={styles.label}>Date of Birth:</div>
        <div className={styles.text}>{dateOfBirthValue}</div>
      </div>
      <div className={styles.info_block}>
        <div className={styles.label}>Email:</div>
        <div className={styles.text}>{userData.email}</div>
      </div>
    </>
  );
}
