import { Header } from '../../common/Header/Header';
import { NotFoundPageMain } from './NotFoundPageMain/NotFoundPageMain';

export function NotFoundPage(): React.ReactElement {
  return (
    <div>
      <Header />
      <NotFoundPageMain />
    </div>
  );
}
