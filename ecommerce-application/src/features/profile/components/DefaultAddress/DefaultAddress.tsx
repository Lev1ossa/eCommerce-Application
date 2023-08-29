import { IAddressData } from '../../../../types/types';
import { getCountryName } from '../../../autentification/utils/utils';

export function DefaultAddress(props: {
  styles: CSSModuleClasses;
  defaultShippingAddress: IAddressData | undefined;
}): React.ReactElement {
  const { styles, defaultShippingAddress } = props;
  let countryInputValue;
  if (defaultShippingAddress?.country) {
    countryInputValue = getCountryName(defaultShippingAddress?.country);
  }
  return (
    <div className={`${styles.info_blocks_container} ${styles.default}`}>
      <p className={`${styles.container_subtitle} ${styles.default}`}>
        Default Shipping Address
      </p>
      <div className={styles.info_block}>
        <div className={styles.label}>Street:</div>
        <div className={styles.text}>{defaultShippingAddress?.streetName}</div>
      </div>
      <div className={styles.info_block}>
        <div className={styles.label}>City:</div>
        <div className={styles.text}>{defaultShippingAddress?.city}</div>
      </div>
      <div className={styles.info_block}>
        <div className={styles.label}>Country:</div>
        <div className={styles.text}>{countryInputValue}</div>
      </div>
      <div className={styles.info_block}>
        <div className={styles.label}>Postal Code:</div>
        <div className={styles.text}>{defaultShippingAddress?.postalCode}</div>
      </div>
    </div>
  );
}
