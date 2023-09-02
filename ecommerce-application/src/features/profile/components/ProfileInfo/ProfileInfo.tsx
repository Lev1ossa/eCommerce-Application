import { IUserData } from '../../../../types/types';
import { Account } from '../Account/Account';
import { Addresses } from '../Addresses/Addresses';
import { Password } from '../Password/Password';

export function ProfileInfo(props: {
  activeArticle: string;
  userData: IUserData;
}): React.ReactElement | null {
  const { activeArticle, userData } = props;
  switch (activeArticle) {
    case 'account':
      return <Account userData={userData} />;
    case 'password':
      return <Password userData={userData} />;
    case 'addresses':
      return <Addresses />;
    default:
      return null;
  }
}
