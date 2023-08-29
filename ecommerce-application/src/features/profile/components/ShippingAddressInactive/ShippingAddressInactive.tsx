import { IUserData } from '../../../../types/types';
import { getCountryName } from '../../../autentification/utils/utils';

// eslint-disable-next-line max-lines-per-function
export function ShippingAddressInactive(props: {
  styles: CSSModuleClasses;
  userData: IUserData;
}): React.ReactElement {
  const { styles, userData } = props;
  const shippingAddressIds = userData.shippingAddressIds[0];
  const addressData = userData.addresses.find(
    (el) => el.id === shippingAddressIds,
  );
  let countryInputValue;
  if (addressData?.country) {
    countryInputValue = getCountryName(addressData?.country);
  }
  return (
    <>
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
        <div className={styles.text}>{countryInputValue}</div>
      </div>
      <div className={styles.info_block}>
        <div className={styles.label}>Postal Code:</div>
        <div className={styles.text}>{addressData?.postalCode}</div>
      </div>
    </>
  );
}
