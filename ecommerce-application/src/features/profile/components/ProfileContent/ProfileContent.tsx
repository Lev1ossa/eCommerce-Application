import { useState } from 'react';
import { ProfileInfo } from '../ProfileInfo/ProfileInfo';

import styles from './ProfileContent.module.scss';

const userData = {
  /* id: 'ad1382f3-ad26-4d27-9cd3-5a8c216033bf',
  version: 1,
  versionModifiedAt: '2023-08-27T20:10:38.109Z',
  lastMessageSequenceNumber: 1,
  createdAt: '2023-08-27T20:10:38.109Z',
  lastModifiedAt: '2023-08-27T20:10:38.109Z',
  lastModifiedBy: {
    clientId: 'oLffZqV3AqTlwXt1X27xF87V',
    isPlatformClient: false,
  },
  createdBy: {
    clientId: 'oLffZqV3AqTlwXt1X27xF87V',
    isPlatformClient: false,
  }, */
  email: 'sdfdef@jejfu.ju',
  firstName: 'ddd',
  lastName: 'dddd',
  dateOfBirth: '1999-01-01',
  password: '****t4Y=',
  addresses: [
    {
      id: 'lMy62e2R',
      streetName: 'dddd',
      postalCode: '111111',
      city: 'ddd',
      country: 'BY',
    },
    {
      id: 'NmgefXgI',
      streetName: 'ddddddd',
      postalCode: '111111',
      city: 'dddddd',
      country: 'BY',
    },
  ],
  defaultShippingAddressId: 'lMy62e2R',
  defaultBillingAddressId: 'NmgefXgI',
  shippingAddressIds: ['lMy62e2R'],
  billingAddressIds: ['NmgefXgI'],
  /* isEmailVerified: false,
  stores: [],
  authenticationMode: 'Password', */
};

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
          <div clas />
          <h3>{`${userData.firstName} ${userData.lastName}`}</h3>
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
      <ProfileInfo activeArticle={activeArticle} userData={userData} />
    </main>
  );
}
