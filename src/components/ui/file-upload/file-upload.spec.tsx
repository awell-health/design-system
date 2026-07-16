import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { FileUpload } from './file-upload';

describe('FileList Component', () => {
  const subject = (props = {}) => {
    return render(<FileUpload onChange={() => {}} {...props} />);
  };

  it('should match snapshot', () => {
    const { container } = subject();
    expect(container).toMatchSnapshot();
  });

  it('triggers onChange when a file is uploaded', () => {
    const onChange = vi.fn();
    const { container } = subject({ onChange });
    const input = container.querySelector('input');

    if (input) {
      const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
      Object.defineProperty(file, 'size', { value: 1024 * 1024 + 1 });

      fireEvent.change(input, { target: { files: [file] } });
      expect(onChange).toHaveBeenCalled();
    } else {
      throw new Error('Input not found');
    }
  });

  it('sets the capture attribute on the input when provided', () => {
    const { container } = subject({ capture: 'environment' });
    const input = container.querySelector('input[type="file"]');
    expect(input?.getAttribute('capture')).toBe('environment');
  });

  it('does not set the capture attribute by default', () => {
    const { container } = subject();
    const input = container.querySelector('input[type="file"]');
    expect(input?.hasAttribute('capture')).toBe(false);
  });
});
