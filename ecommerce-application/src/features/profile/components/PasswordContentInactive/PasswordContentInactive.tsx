import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';
import { useState } from 'react';
import { IUserData } from '../../../../types/types';

export function PasswordContentInactive(props: {
  styles: CSSModuleClasses;
  userData: IUserData;
}): React.ReactElement {
  const { styles, userData } = props;
  const [showPassword, setShowPassword] = useState(false);
  const passwordSecure = userData.password.replace(/./g, '•');
  const text = showPassword ? userData.password : passwordSecure;
  return (
    <div className={styles.info_block}>
      <div className={styles.label}>Password:</div>
      <div className={styles.password_input_block}>
        <div className={styles.text}>{text}</div>
        {showPassword && (
          <button
            className={styles.password_button}
            onClick={(): void => setShowPassword(!showPassword)}
            type="button"
            aria-label="show"
          >
            <PiEyeBold className={styles.password_icon} />
          </button>
        )}
        {!showPassword && (
          <button
            className={styles.password_button}
            onClick={(): void => setShowPassword(!showPassword)}
            type="button"
            aria-label="show"
          >
            <PiEyeClosedBold className={styles.password_icon} />
          </button>
        )}
      </div>
    </div>
  );
}
