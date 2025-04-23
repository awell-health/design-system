import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { Label } from './label';

describe('Label', () => {
  it('match snapshot', () => {
    const { container } = render(<Label label='Label' sublabel='Sublabel' />);
    expect(container).toMatchSnapshot();
  });

  it('should render label and sublabel', () => {
    render(<Label label='Label' sublabel='Sublabel' />);
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByText('Sublabel')).toBeInTheDocument();
  });

  it('should render asterisk when required', () => {
    render(<Label label='Label' sublabel='Sublabel' required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
