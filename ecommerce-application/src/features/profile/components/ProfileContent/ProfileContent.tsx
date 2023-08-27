import { useState } from 'react';
import { ProfileInfo } from '../ProfileInfo/ProfileInfo';

import styles from './ProfileContent.module.scss';

export function ProfileContent(): React.ReactElement {
  const [activeArticle, setActiveArticle] = useState('account');
  const handleButtonAccount = (): void => {
    setActiveArticle('account');
  };
  const handleButtonShippingAddress = (): void => {
    setActiveArticle('shippingAddress');
  };
  const handleButtonBillingAddress = (): void => {
    setActiveArticle('billingAddress');
  };
  return (
    <main className={styles.container}>
      <div>
        <div>
          <img alt="foto" />
          <div>Text</div>
        </div>
        <div className={styles.buttons_container}>
          <button type="button" onClick={handleButtonAccount}>
            Account
          </button>
          <button type="button" onClick={handleButtonShippingAddress}>
            Shipping Address
          </button>
          <button type="button" onClick={handleButtonBillingAddress}>
            Billing Address
          </button>
        </div>
      </div>
      <ProfileInfo activeArticle={activeArticle} />
    </main>
  );
}
