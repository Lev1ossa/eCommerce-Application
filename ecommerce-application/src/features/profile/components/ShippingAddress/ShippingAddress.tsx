import { LiaShippingFastSolid } from 'react-icons/lia';
import { BiEditAlt } from 'react-icons/bi';
import { useState } from 'react';
import { IUserData } from '../../../../types/types';
import styles from './ShippingAddress.module.scss';
import { ShippingAddressInactive } from '../ShippingAddressInactive/ShippingAddressInactive';
import { ShippingAddressActive } from '../ShippingAddressActive/ShippingAddressActive';

// eslint-disable-next-line max-lines-per-function
export function ShippingAddress(props: {
  userData: IUserData;
}): React.ReactElement {
  const { userData } = props;
  const [editMode, setEditMode] = useState(false);
  const handleEditButton = (): void => {
    setEditMode(!editMode);
  };
  return (
    <div className={styles.article}>
      <h3 className={styles.title}>
        <LiaShippingFastSolid className={styles.icon} />
        Shipping Address
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
      {!editMode && (
        <ShippingAddressInactive styles={styles} userData={userData} />
      )}
      {editMode && (
        <ShippingAddressActive
          styles={styles}
          userData={userData}
          handleEditButton={handleEditButton}
        />
      )}
    </div>
  );
}
