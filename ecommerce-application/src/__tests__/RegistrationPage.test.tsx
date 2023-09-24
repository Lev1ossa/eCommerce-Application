import { describe, it } from 'vitest';
import { shallow } from 'enzyme';
import '../setupTests';
import { RegistrationPage } from '../Pages/RegistrationPage/RegistrationPage';

describe('RegistrationPage', () => {
  it('Should render the RegistrationPage correctly', () => {
    shallow(<RegistrationPage />);
  });
});
