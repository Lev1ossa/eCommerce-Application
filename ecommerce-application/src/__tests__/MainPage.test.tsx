import { describe, it } from 'vitest';
import { shallow } from 'enzyme';
import '../setupTests';
import { MainPage } from '../Pages/MainPage/MainPage';

describe('LoginPage', () => {
  it('Should render the LoginPage correctly', () => {
    shallow(<MainPage />);
  });
});
