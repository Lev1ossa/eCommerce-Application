import { Header } from '../../common/Header/Header';
import { MainPageMain } from './MainPageMain/MainPageMain';

export function MainPage(): React.ReactElement {
  return (
    <div>
      <Header />
      <MainPageMain />
    </div>
  );
}
