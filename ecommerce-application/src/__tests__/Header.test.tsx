import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { BrowserRouter } from 'react-router-dom';
import { Header } from '../components/common/Header/Header';

describe('Renders Header correctly', async () => {
  it('Should render the Header component correctly', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
  });
});
