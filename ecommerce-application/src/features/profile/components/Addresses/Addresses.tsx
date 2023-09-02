import { LiaShippingFastSolid } from 'react-icons/lia';
import { useState } from 'react';
import styles from './Addresses.module.scss';
import { AddressCard } from '../AddressCard/AddressCard';
import { Modal } from '../../../modal';
import { UserAdress } from '../../../../types/types';

const addressesData = [
  {
    city: 'a',
    country: 'BY',
    id: '0xe7kPdI',
    isBilling: false,
    isDefaultBilling: false,
    isDefaultShipping: true,
    isShipping: true,
    postalCode: '111111',
    streetName: 'a',
  },
  {
    city: 'b',
    country: 'BY',
    id: '2222222',
    isBilling: false,
    isDefaultBilling: false,
    isDefaultShipping: false,
    isShipping: true,
    postalCode: '222222',
    streetName: 'b',
  },
  {
    city: 'a',
    country: 'BY',
    id: '444444',
    isBilling: true,
    isDefaultBilling: false,
    isDefaultShipping: false,
    isShipping: false,
    postalCode: '333333',
    streetName: 'a',
  },
  {
    city: 'c',
    country: 'BY',
    id: '333333',
    isBilling: true,
    isDefaultBilling: true,
    isDefaultShipping: false,
    isShipping: true,
    postalCode: '333333',
    streetName: 'c',
  },
];

// eslint-disable-next-line max-lines-per-function
export function Addresses(): React.ReactElement {
  const [modalActive, setModalActive] = useState(false);
  const [modalAddressId, setModalAddressId] = useState('0xe7kPdI');
  const data = addressesData.find((el) => el.id === modalAddressId);
  return (
    <>
      <div className={styles.article}>
        <h3 className={styles.title}>
          <LiaShippingFastSolid className={styles.icon} />
          ADDRESSES
        </h3>
        {addressesData.map((addressData) => {
          return (
            <AddressCard
              styles={styles}
              key={addressData.id}
              addressData={addressData}
              setModalActive={setModalActive}
              setModalAddressId={setModalAddressId}
              disabled
            />
          );
        })}
      </div>
      {modalActive && (
        <Modal active={modalActive} setActive={setModalActive}>
          <div className={styles.slider_modal}>
            <header className={styles.modal_header}>
              <h3>Name</h3>
              <button
                type="button"
                className={styles.modal_button}
                onClick={(): void => setModalActive(false)}
              >
                X
              </button>
            </header>
          </div>
          <AddressCard
            styles={styles}
            addressData={data as UserAdress}
            setModalActive={setModalActive}
            setModalAddressId={setModalAddressId}
            disabled={false}
          />
        </Modal>
      )}
    </>
  );
}
