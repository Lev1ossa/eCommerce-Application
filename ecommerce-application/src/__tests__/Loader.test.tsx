import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { Loader } from '../components/Loader';

describe('Renders Loader correctly', async () => {
  it('Should render the Loader correctly', async () => {
    render(<Loader />);
  });
});
