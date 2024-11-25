import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { FormSection } from './FormSection';

describe('FormSection', () => {
  const subject = (props = {}) => (
    <FormSection title='Test Title' {...props}>
      <div>Test Content</div>
    </FormSection>
  );

  it('match snapshot', () => {
    const { container } = render(subject());
    expect(container).toMatchSnapshot();
  });

  it('renders the title', () => {
    render(subject());
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders the hint when provided', () => {
    render(subject({ hint: 'Test Hint' }));
    expect(screen.getByText('Test Hint')).toBeInTheDocument();
  });

  it('does not render the hint when not provided', () => {
    render(subject());
    expect(screen.queryByText('Test Hint')).not.toBeInTheDocument();
  });

  it('renders children content', () => {
    render(subject({ children: 'Test Content' }));
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});