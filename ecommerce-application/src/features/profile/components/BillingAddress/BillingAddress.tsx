import { BsCreditCard } from 'react-icons/bs';
import { BiEditAlt } from 'react-icons/bi';
import { useState } from 'react';
import { IAddressData, IUserData } from '../../../../types/types';
import styles from './BillingAddress.module.scss';
import { DefaultAddress } from '../DefaultAddress/DefaultAddress';
import { AddressInactive } from '../AddressInactive/AddressInactive';
import { AddressActive } from '../AddressActive/AddressActive';

// eslint-disable-next-line max-lines-per-function
export function BillingAddress(props: {
  userData: IUserData;
}): React.ReactElement {
  const { userData } = props;
  const [editMode, setEditMode] = useState(false);
  const handleEditButton = (): void => {
    setEditMode(!editMode);
  };
  const { defaultBillingAddressId } = userData;
  const defaultShippingAddress = userData.addresses.find(
    (el) => el.id === defaultBillingAddressId,
  );
  const shippingAddressIds = userData.shippingAddressIds[0];
  const addressData = userData.addresses.find(
    (el) => el.id === shippingAddressIds,
  );

  return (
    <div className={styles.article}>
      <h3 className={styles.title}>
        <BsCreditCard className={styles.icon} />
        Billing Address
        {!editMode && (
          <button
            className={styles.edit_button}
            onClick={handleEditButton}
            type="button"
          >
            <BiEditAlt className={styles.edit_button_icon} />
            Edit
          </button>
        )}
      </h3>
      <DefaultAddress
        styles={styles}
        defaultShippingAddress={defaultShippingAddress}
      />
      {!editMode && (
        <AddressInactive
          styles={styles}
          addressData={addressData as IAddressData}
        />
      )}
      {editMode && (
        <AddressActive
          styles={styles}
          addressData={addressData as IAddressData}
          handleEditButton={handleEditButton}
        />
      )}
    </div>
  );
}
