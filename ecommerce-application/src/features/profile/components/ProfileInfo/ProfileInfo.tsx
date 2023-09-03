import { Customer } from '@commercetools/platform-sdk';
import { Account } from '../Account/Account';
import { Addresses } from '../Addresses/Addresses';
import { Password } from '../Password/Password';

export function ProfileInfo(props: {
  activeArticle: string;
  userData: Customer;
}): React.ReactElement | null {
  const { activeArticle, userData } = props;
  switch (activeArticle) {
    case 'account':
      return <Account userData={userData} />;
    case 'password':
      return <Password />;
    case 'addresses':
      return <Addresses />;
    default:
      return null;
  }
}
