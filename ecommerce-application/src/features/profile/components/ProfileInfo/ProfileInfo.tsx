import { IUserData } from '../../../../types/types';
import { Account } from '../Account/Account';
import { BillingAddress } from '../BillingAddress/BillingAddress';
import { ShippingAddress } from '../ShippingAddress/ShippingAddress';

export function ProfileInfo(props: {
  activeArticle: string;
  userData: IUserData;
}): React.ReactElement | null {
  const { activeArticle, userData } = props;
  switch (activeArticle) {
    case 'account':
      return <Account userData={userData} />;
    case 'shippingAddress':
      return <ShippingAddress userData={userData} />;
    case 'billingAddress':
      return <BillingAddress userData={userData} />;
    default:
      return null;
  }
}
