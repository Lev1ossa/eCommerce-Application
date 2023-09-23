import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from '../components/Footer/Footer';

describe('Renders footer correctly', async () => {
  it('Should render footr correctly', async () => {
    render(<Footer />);
    const p = screen.queryByText('2023 Good Food');
    expect(p).not.toBeNull();
  });
});
