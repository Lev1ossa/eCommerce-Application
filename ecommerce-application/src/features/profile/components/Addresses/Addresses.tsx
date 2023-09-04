import { useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import styles from './Addresses.module.scss';
import { AddressCard } from '../AddressCard/AddressCard';
import { Modal } from '../../../modal';
import { UserAdress } from '../../../../types/types';
import { AddressCardActive } from '../AddressCardActive/AddressCardActive';
import { NewAddressCard } from '../NewAddressCard/NewAddressCard';
import { getCustomerData } from '../../../../api/requests';

// eslint-disable-next-line max-lines-per-function
export function Addresses(): React.ReactElement {
  const [modalActive, setModalActive] = useState(false);
  const [modalCreateAddressActive, setModalCreateAddressActive] =
    useState(false);
  const [modalAddressId, setModalAddressId] = useState('');
  const [addressesData, setAddressesData] = useState<UserAdress[]>([]);

  // eslint-disable-next-line max-lines-per-function
  const handleAddButton = (): void => {
    getCustomerData().then(
      (result) => {
        const customerData = result.body;
        const customerAdresses: UserAdress[] = customerData.addresses.map(
          (adress) => {
            const { id, country, city, streetName, postalCode } = adress;
            const isShipping =
              id && customerData.shippingAddressIds
                ? customerData.shippingAddressIds.includes(id)
                : false;
            const isBilling =
              id && customerData.billingAddressIds
                ? customerData.billingAddressIds.includes(id)
                : false;
            const isDefaultShipping =
              id && customerData.defaultShippingAddressId
                ? customerData.defaultShippingAddressId.includes(id)
                : false;
            const isDefaultBilling =
              id && customerData.defaultBillingAddressId
                ? customerData.defaultBillingAddressId.includes(id)
                : false;
            const userAdress: UserAdress = {
              id,
              country,
              city,
              streetName,
              postalCode,
              isShipping,
              isBilling,
              isDefaultShipping,
              isDefaultBilling,
            };

            return userAdress;
          },
        );
        setAddressesData(customerAdresses);
        setModalCreateAddressActive(false);
      },
      (error) => {
        console.log(error);
      },
    );
  };
  // eslint-disable-next-line max-lines-per-function
  const handleSaveButton = (): void => {
    getCustomerData().then(
      (result) => {
        const customerData = result.body;
        const customerAdresses: UserAdress[] = customerData.addresses.map(
          (adress) => {
            const { id, country, city, streetName, postalCode } = adress;
            const isShipping =
              id && customerData.shippingAddressIds
                ? customerData.shippingAddressIds.includes(id)
                : false;
            const isBilling =
              id && customerData.billingAddressIds
                ? customerData.billingAddressIds.includes(id)
                : false;
            const isDefaultShipping =
              id && customerData.defaultShippingAddressId
                ? customerData.defaultShippingAddressId.includes(id)
                : false;
            const isDefaultBilling =
              id && customerData.defaultBillingAddressId
                ? customerData.defaultBillingAddressId.includes(id)
                : false;
            const userAdress: UserAdress = {
              id,
              country,
              city,
              streetName,
              postalCode,
              isShipping,
              isBilling,
              isDefaultShipping,
              isDefaultBilling,
            };

            return userAdress;
          },
        );
        setAddressesData(customerAdresses);
        setModalActive(false);
      },
      (error) => {
        console.log(error);
      },
    );
  };
  // eslint-disable-next-line max-lines-per-function
  const handleDeleteButton = (): void => {
    getCustomerData().then(
      (result) => {
        const customerData = result.body;
        const customerAdresses: UserAdress[] = customerData.addresses.map(
          (adress) => {
            const { id, country, city, streetName, postalCode } = adress;
            const isShipping =
              id && customerData.shippingAddressIds
                ? customerData.shippingAddressIds.includes(id)
                : false;
            const isBilling =
              id && customerData.billingAddressIds
                ? customerData.billingAddressIds.includes(id)
                : false;
            const isDefaultShipping =
              id && customerData.defaultShippingAddressId
                ? customerData.defaultShippingAddressId.includes(id)
                : false;
            const isDefaultBilling =
              id && customerData.defaultBillingAddressId
                ? customerData.defaultBillingAddressId.includes(id)
                : false;
            const userAdress: UserAdress = {
              id,
              country,
              city,
              streetName,
              postalCode,
              isShipping,
              isBilling,
              isDefaultShipping,
              isDefaultBilling,
            };
            return userAdress;
          },
        );
        setAddressesData(customerAdresses);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  // eslint-disable-next-line max-lines-per-function
  useEffect(() => {
    // eslint-disable-next-line max-lines-per-function
    getCustomerData().then(
      (result) => {
        const customerData = result.body;
        const customerAdresses: UserAdress[] = customerData.addresses.map(
          (adress) => {
            const { id, country, city, streetName, postalCode } = adress;
            const isShipping =
              id && customerData.shippingAddressIds
                ? customerData.shippingAddressIds.includes(id)
                : false;
            const isBilling =
              id && customerData.billingAddressIds
                ? customerData.billingAddressIds.includes(id)
                : false;
            const isDefaultShipping =
              id && customerData.defaultShippingAddressId
                ? customerData.defaultShippingAddressId.includes(id)
                : false;
            const isDefaultBilling =
              id && customerData.defaultBillingAddressId
                ? customerData.defaultBillingAddressId.includes(id)
                : false;
            const userAdress: UserAdress = {
              id,
              country,
              city,
              streetName,
              postalCode,
              isShipping,
              isBilling,
              isDefaultShipping,
              isDefaultBilling,
            };

            return userAdress;
          },
        );
        setAddressesData(customerAdresses);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

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
                handleDeleteButton={handleDeleteButton}
              />
            );
          })}
        </div>
      </div>
      {modalActive && (
        <Modal
          active={modalActive}
          setActive={setModalActive}
          title="Edit address"
        >
          <div className={styles.modal}>
            <AddressCardActive
              styles={styles}
              addressData={data as UserAdress}
              handleSaveButton={handleSaveButton}
            />
          </div>
        </Modal>
      )}
      {modalCreateAddressActive && (
        <Modal
          active={modalCreateAddressActive}
          setActive={setModalCreateAddressActive}
          title="Create address"
        >
          <div className={styles.modal}>
            <NewAddressCard styles={styles} handleAddButton={handleAddButton} />
          </div>
        </Modal>
      )}
    </>
  );
}
