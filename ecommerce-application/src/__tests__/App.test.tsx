import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '../App';

// App
describe('Renders main page correctly', async () => {
  it('Should render the page correctly', async () => {
    render(<App />);
    const h1 = screen.queryByText('Vite + React');
    expect(h1).toBeNull();
  });
});
