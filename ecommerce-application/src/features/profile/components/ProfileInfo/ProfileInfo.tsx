import { Account } from '../Account/Account';
import { BillingAddress } from '../BillingAddress/BillingAddress';
import { ShippingAddress } from '../ShippingAddress/ShippingAddress';

export function ProfileInfo(props: {
  activeArticle: string;
}): React.ReactElement | null {
  const { activeArticle } = props;
  switch (activeArticle) {
    case 'account':
      return <Account />;
    case 'shippingAddress':
      return <ShippingAddress />;
    case 'billingAddress':
      return <BillingAddress />;
    default:
      return null;
  }
}
