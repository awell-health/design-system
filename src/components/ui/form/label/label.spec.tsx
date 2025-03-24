import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { Label } from './label';

describe('Label', () => {
  it('should render', () => {
    render(<Label label='Label' sublabel='Sublabel' />);
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByText('Sublabel')).toBeInTheDocument();
  });
});
