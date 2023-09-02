import { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import styles from './Addresses.module.scss';
import { AddressCard } from '../AddressCard/AddressCard';
import { Modal } from '../../../modal';
import { UserAdress } from '../../../../types/types';
import { AddressCardActive } from '../AddressCardActive/AddressCardActive';
import { NewAddressCard } from '../NewAddressCard/NewAddressCard';

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
  const [modalCreateAddressActive, setModalCreateAddressActive] =
    useState(false);
  const [modalAddressId, setModalAddressId] = useState('0xe7kPdI');
  const data = addressesData.find((el) => el.id === modalAddressId);
  const handleCreateAddressButton = (): void => {
    setModalCreateAddressActive(true);
  };
  return (
    <>
      <div className={styles.article}>
        <h3 className={styles.title}>
          <AiOutlineHome className={styles.icon} />
          Addresses
          <button
            className={styles.edit_button}
            onClick={handleCreateAddressButton}
            type="button"
          >
            <BiEditAlt className={styles.edit_button_icon} />
            Add Address
          </button>
        </h3>
        <div className={styles.addresses_container}>
          {addressesData.map((addressData) => {
            return (
              <AddressCard
                styles={styles}
                key={addressData.id}
                addressData={addressData}
                setModalActive={setModalActive}
                setModalAddressId={setModalAddressId}
              />
            );
          })}
        </div>
      </div>
      {modalActive && (
        <Modal active={modalActive} setActive={setModalActive}>
          <div className={styles.modal}>
            <header className={styles.modal_header}>
              <h3>Edit address</h3>
              <button
                type="button"
                className={styles.modal_button}
                onClick={(): void => setModalActive(false)}
              >
                X
              </button>
            </header>
            <AddressCardActive
              styles={styles}
              addressData={data as UserAdress}
            />
          </div>
        </Modal>
      )}
      {modalCreateAddressActive && (
        <Modal
          active={modalCreateAddressActive}
          setActive={setModalCreateAddressActive}
        >
          <div className={styles.modal}>
            <header className={styles.modal_header}>
              <h3>Create address</h3>
              <button
                type="button"
                className={styles.modal_button}
                onClick={(): void => setModalCreateAddressActive(false)}
              >
                X
              </button>
            </header>
            <NewAddressCard styles={styles} />
          </div>
        </Modal>
      )}
    </>
  );
}
