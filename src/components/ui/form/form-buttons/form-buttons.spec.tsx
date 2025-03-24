import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { FormButtons } from './FormButtons';
import { expect, it, describe, vi } from 'vitest';

describe('FormButtons', () => {
  it('match snapshot', () => {
    const { container } = render(<FormButtons />);

    expect(container).toMatchSnapshot();
  });

  it('renders custom buttons and triggers onClick events', () => {
    const handleClick = vi.fn();
    const buttons = {
      save: <div onClick={handleClick}>Button 1</div>,
      cancel: <div onClick={handleClick}>Button 2</div>,
      remove: <div onClick={handleClick}>Button 3</div>
    };

    const { getByText } = render(<FormButtons {...buttons} />);

    // Check if buttons are rendered
    const saveButton = getByText('Button 1');
    const cancelButton = getByText('Button 2');
    const removeButton = getByText('Button 3');

    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(saveButton);
    fireEvent.click(cancelButton);
    fireEvent.click(removeButton);

    expect(handleClick).toHaveBeenCalledTimes(3);
  });
});
