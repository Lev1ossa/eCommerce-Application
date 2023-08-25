import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { BrowserRouter } from 'react-router-dom';
import { MainPage } from '../Pages/MainPage/MainPage';

describe('Renders MainPage correctly', async () => {
  it('Should render the MainPage correctly', async () => {
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>,
    );
  });
});
