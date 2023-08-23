import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { BrowserRouter } from 'react-router-dom';
import { NotFoundPage } from '../components/Pages/NotFoundPage/NotFoundPage';

describe('Renders NotFoundPage correctly', async () => {
  it('Should render the NotFoundPage correctly', async () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>,
    );
  });
});
