import { AiOutlineHome, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { Customer } from '@commercetools/platform-sdk';
import { ProfileInfo } from '../ProfileInfo/ProfileInfo';
import styles from './ProfileContent.module.scss';
import { getCustomerData } from '../../../../api/requests';

// eslint-disable-next-line max-lines-per-function
export function ProfileContent(): React.ReactElement {
  const [activeArticle, setActiveArticle] = useState('account');
  const [userData, setUserData] = useState<Customer>();

  const handleButtonAccount = (): void => {
    setActiveArticle('account');
  };

  const handleButtonPassword = (): void => {
    setActiveArticle('password');
  };

  const handleButtonAddresses = (): void => {
    setActiveArticle('addresses');
  };

  useEffect(() => {
    getCustomerData().then(
      (result) => {
        setUserData(result.body);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.article}>
        <div>
          <div className={styles.image} />
          <h3
            className={styles.title}
          >{`${userData?.firstName} ${userData?.lastName}`}</h3>
        </div>
        <div className={styles.buttons_container}>
          <button
            className={styles.button}
            type="button"
            onClick={handleButtonAccount}
          >
            <AiOutlineUser className={styles.icon} />
            Account
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={handleButtonPassword}
          >
            <AiOutlineLock className={styles.icon} />
            Password
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={handleButtonAddresses}
          >
            <AiOutlineHome className={styles.icon} />
            Addresses
          </button>
        </div>
      </div>
      {userData && (
        <ProfileInfo
          activeArticle={activeArticle}
          userData={userData}
          setUserData={setUserData}
        />
      )}
    </main>
  );
}
