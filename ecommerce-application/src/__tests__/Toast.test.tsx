import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { Toast } from '../components/Toast/Toast';

describe('Renders Toast correctly', async () => {
  it('Should render the Toast correctly', async () => {
    render(<Toast />);
  });
});
