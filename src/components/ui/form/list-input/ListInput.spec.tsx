import { fireEvent, render } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { ListInput } from './ListInput';
import React from 'react';

describe('Textarea', () => {
  const subject = (props = {}) => {
    const defaultProps = {
      value: ['test'],
      onChange: () => {},
      placeholder: 'Type to add an item',
      helperText: 'Hit enter or click + to add a new item',
      label: 'List Input',
      required: true
    };

    return render(<ListInput {...defaultProps} {...props} />);
  };
  it('match snapshot', () => {
    expect(subject().container).toMatchSnapshot();
  });

  it('shows error state', () => {
    const { container, queryByText } = subject({ error: 'Error message' });

    expect(container.querySelectorAll('.border-red-500')).toHaveLength(1);
    expect(queryByText('Error message')).toBeInTheDocument();
  });

  it('returns the correct value', () => {
    const onChange = vi.fn();
    const { container, queryByText } = subject({ onChange });

    expect(queryByText('test')).toBeInTheDocument();

    const input = container.querySelector('input');

    if (!input) {
      throw new Error('Input not found');
    }

    fireEvent.change(input, { target: { value: 'test4' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(queryByText('test4')).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledWith(['test', 'test4']);
  });
});
