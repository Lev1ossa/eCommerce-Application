import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { BrowserRouter } from 'react-router-dom';
import { RegistrationPage } from '../Pages/RegistrationPage/RegistrationPage';

describe('Renders RegistrationPage correctly', async () => {
  it('Should render the RegistrationPage correctly', async () => {
    render(
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>,
    );
  });
});
