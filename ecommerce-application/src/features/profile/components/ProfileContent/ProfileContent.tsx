import { AccountContent } from '../Account/Account';
import styles from './ProfileContent.module.scss';

export function ProfileContent(): React.ReactElement {
  return (
    <main className={styles.container}>
      <div>
        <div>
          <img alt="foto" />
          <div>Text</div>
        </div>
        <div className={styles.buttons_container}>
          <button type="button">Account</button>
          <button type="button">Shipping Address</button>
          <button type="button">Billing Address</button>
        </div>
      </div>
      <AccountContent />
    </main>
  );
}
