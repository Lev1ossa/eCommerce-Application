import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { BrowserRouter } from 'react-router-dom';
import { LoginPage } from '../components/Pages/LoginPage/LoginPage';

describe('Renders LoginPageMain correctly', async () => {
  it('Should render the LoginPageMain correctly', async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );
  });
});
