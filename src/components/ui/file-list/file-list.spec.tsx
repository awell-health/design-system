import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { FileList } from './file-list';
import { FileListItem } from './types';

const defaultFiles = [
  { name: 'file1.txt', size: 100, type: 'text/plain' },
  { name: 'file2.txt', size: 200, type: 'text/plain' },
  { name: 'file3.txt', size: 300, type: 'text/plain' }
];

describe('FileList Component', () => {
  const subject = (files: FileListItem[], onDelete?: (file: FileListItem) => void) => {
    return <FileList files={files} onDelete={onDelete ?? (() => {})} />;
  };

  it('should mathch snapshot', () => {
    const { container } = render(subject(defaultFiles));
    expect(container).toMatchSnapshot();
  });

  it('should display the correct number of files', () => {
    const { container } = render(subject(defaultFiles));
    expect(container.querySelectorAll('.file-list-item')).toHaveLength(defaultFiles.length);
  });

  it('triggers onDelete when the delete button is clicked', () => {
    const onDelete = vi.fn();
    const { container } = render(subject(defaultFiles, onDelete));
    const deleteButton = container.querySelector('.file-list-item button');

    if (deleteButton) {
      fireEvent.click(deleteButton);
      expect(onDelete).toHaveBeenCalled();
    } else {
      throw new Error('Delete button not found');
    }
  });

  // Add more tests as needed for additional functionality
});
