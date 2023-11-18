import { describe, it } from 'vitest';
import { shallow } from 'enzyme';
import '../setupTests';
import { LoginPage } from '../Pages/LoginPage/LoginPage';

describe('LoginPage', () => {
  it('Should render the LoginPage correctly', () => {
    shallow(<LoginPage />);
  });
});
