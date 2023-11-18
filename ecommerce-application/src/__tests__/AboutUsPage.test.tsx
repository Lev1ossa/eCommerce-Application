import { describe, it } from 'vitest';
import { shallow } from 'enzyme';
import '../setupTests';
import { AboutUsPage } from '../Pages/AboutUsPage/AboutUsPage';

describe('AboutUsPage', () => {
  it('Should render the AboutUsPage correctly', () => {
    shallow(<AboutUsPage />);
  });
});
