import { Header } from '../../common/Header/Header';
import LoginPageMain from './LoginPageMain/LoginPageMain';

export function LoginPage(): React.ReactElement {
  return (
    <div>
      <Header />
      <LoginPageMain />
    </div>
  );
}
