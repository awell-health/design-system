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

  it('renders the required asterisk when isRequired is true', () => {
    render(subject({ isRequired: true }));
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('does not render the required asterisk when isRequired is false', () => {
    render(subject());
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('renders the separator when showSeparator is true', () => {
    render(subject({ showSeparator: true }));
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('does not render the separator when showSeparator is false', () => {
    render(subject({ showSeparator: false }));
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
  });
});
