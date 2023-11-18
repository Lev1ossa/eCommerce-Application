import { useContext, useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BsHouseAdd } from 'react-icons/bs';
import styles from './Addresses.module.scss';
import { AddressCard } from '../AddressCard/AddressCard';
import { Modal } from '../../../modal';
import { UserAdress } from '../../../../types/types';
import { AddressCardActive } from '../AddressCardActive/AddressCardActive';
import { NewAddressCard } from '../NewAddressCard/NewAddressCard';
import { getCustomerData } from '../../../../api/requests';
import { ApiRootContext } from '../../../../context/ApiRootContext';

export function Addresses(): React.ReactElement {
  const [modalActive, setModalActive] = useState(false);
  const [modalCreateAddressActive, setModalCreateAddressActive] =
    useState(false);
  const [modalAddressId, setModalAddressId] = useState('');
  const [addressesData, setAddressesData] = useState<UserAdress[]>([]);
  const refreshTokenFlowApiRoot = useContext(ApiRootContext);

  const handleAddButton = (): void => {
    getCustomerData(refreshTokenFlowApiRoot).then(
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
      (error: Error) => {
        console.log(error);
      },
    );
  };
  const handleSaveButton = (): void => {
    getCustomerData(refreshTokenFlowApiRoot).then(
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
      (error: Error) => {
        console.log(error);
      },
    );
  };
  const handleDeleteButton = (): void => {
    getCustomerData(refreshTokenFlowApiRoot).then(
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
      (error: Error) => {
        console.log(error);
      },
    );
  };

  useEffect(() => {
    getCustomerData(refreshTokenFlowApiRoot).then(
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
      (error: Error) => {
        console.log(error);
      },
    );
  }, [refreshTokenFlowApiRoot]);

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
            <BsHouseAdd className={styles.edit_button_icon} />
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
          title="Add address"
        >
          <div className={styles.modal}>
            <NewAddressCard styles={styles} handleAddButton={handleAddButton} />
          </div>
        </Modal>
      )}
    </>
  );
}
