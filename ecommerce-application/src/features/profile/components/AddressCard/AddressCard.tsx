import { BiEditAlt } from 'react-icons/bi';
import {
  MyCustomerRemoveAddressAction,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import { BsHouseDash } from 'react-icons/bs';
import { ToastTypes, UserAdress } from '../../../../types/types';
import { getCountryName } from '../../../autentification/utils/utils';
import { getCustomerData, updateCustomerData } from '../../../../api/requests';
import { showToast } from '../../../autentification/utils/showToast';

// eslint-disable-next-line max-lines-per-function
export function AddressCard(props: {
  styles: CSSModuleClasses;
  addressData: UserAdress;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setModalAddressId: React.Dispatch<React.SetStateAction<string>>;
  handleDeleteButton: () => void;
}): React.ReactElement {
  const {
    styles,
    addressData,
    setModalActive,
    setModalAddressId,
    handleDeleteButton,
  } = props;
  let countryInputValue = '';
  if (addressData?.country) {
    const countryName = getCountryName(addressData?.country);
    countryInputValue = countryName || '';
  }

  // eslint-disable-next-line max-lines-per-function
  const onClick = (): void => {
    getCustomerData().then(
      (result) => {
        const removeAddress: MyCustomerRemoveAddressAction = {
          action: 'removeAddress',
          addressId: addressData.id,
        };
        const body: MyCustomerUpdate = {
          version: result.body.version,
          actions: [removeAddress],
        };
        updateCustomerData(body).then(
          () => {
            showToast(ToastTypes.success, `Address successfully removed!`);
            handleDeleteButton();
          },
          (error: Error) => {
            showToast(ToastTypes.error, error.message);
          },
        );
      },
      (error: Error) => {
        console.log(error);
      },
    );
  };
  return (
    <div className={styles.info_blocks_container}>
      <div className={styles.info_block}>
        <div className={styles.label}>Street:</div>
        <div className={styles.text}>{addressData?.streetName}</div>
      </div>
      <div className={styles.info_block}>
        <div className={styles.label}>City:</div>
        <div className={styles.text}>{addressData?.city}</div>
      </div>
      <div className={styles.info_block}>
        <div className={styles.label}>Country:</div>
        <div className={`${styles.text} ${styles.country}`}>
          {countryInputValue}
        </div>
      </div>
      <div className={styles.info_block}>
        <div className={styles.label}>Postal code:</div>
        <div className={styles.text}>{addressData?.postalCode}</div>
      </div>
      <div className={styles.input_block}>
        <div className={styles.info_block}>
          <p className={styles.label}>Shipping Address</p>
          <input
            type="checkbox"
            className={styles.input}
            disabled
            checked={addressData.isShipping}
          />
        </div>
      </div>
      <div className={styles.input_block}>
        <div className={styles.info_block}>
          <p className={styles.label}>Default Shipping Address</p>
          <input
            type="checkbox"
            className={styles.input}
            disabled
            checked={addressData.isDefaultShipping}
          />
        </div>
      </div>
      <div className={styles.input_block}>
        <div className={styles.info_block}>
          <p className={styles.label}>Billing Address</p>
          <input
            type="checkbox"
            className={styles.input}
            disabled
            checked={addressData.isBilling}
          />
        </div>
      </div>
      <div className={styles.input_block}>
        <div className={styles.info_block}>
          <p className={styles.label}>Default Billing Address</p>
          <input
            type="checkbox"
            className={styles.input}
            disabled
            checked={addressData.isDefaultBilling}
          />
        </div>
      </div>
      <div className={styles.edit_buttons_container}>
        <button
          className={styles.edit_button}
          type="button"
          onClick={(): void => {
            setModalActive(true);
            setModalAddressId(addressData.id as string);
          }}
        >
          <BiEditAlt className={styles.edit_button_icon} />
          Edit
        </button>
      </div>
      <div className={styles.edit_buttons_container}>
        <button className={styles.edit_button} type="button" onClick={onClick}>
          <BsHouseDash className={styles.edit_button_icon} />
          Delete
        </button>
      </div>
    </div>
  );
}
