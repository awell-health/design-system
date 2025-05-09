import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RichText } from './rich-text';

describe('RichText', () => {
  const mockContent = JSON.stringify([
    {
      type: 'p',
      children: [{ text: 'Test content' }]
    }
  ]);

  const renderComponent = (props = {}) => {
    return render(
      <RichText
        content={mockContent}
        label="Test Label"
        {...props}
      />
    );
  };

  it('renders content correctly', () => {
    const { getByText } = renderComponent();
    expect(getByText('Test content')).toBeDefined();
  });

  it('renders label correctly', () => {
    const { getByText } = renderComponent();
    expect(getByText('Test Label')).toBeDefined();
  });

  it('displays custom label', () => {
    const { getByText } = renderComponent({ label: 'Custom Label' });
    expect(getByText('Custom Label')).toBeDefined();
  });

  it('accepts custom className', () => {
    const { container } = renderComponent({ className: 'custom-class' });
    expect(container.querySelector('.custom-class')).toBeDefined();
  });
}); 