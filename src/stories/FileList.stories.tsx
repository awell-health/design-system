import type { Meta, StoryObj } from '@storybook/react';
import { FileList } from '../components';
import { FileListItem } from '../components/ui/file-list/types';

const meta = {
  component: FileList
} satisfies Meta<typeof FileList>;

export default meta;

type Story = StoryObj<typeof FileList>;

export const Example = {
  args: {
    generalProgress: 50,
    files: [
      { name: 'file1.jpg', size: 1000000, type: 'image/jpeg', progress: 50 },
      { name: 'file2.pdf', size: 2000000, type: 'application/pdf', progress: 75 },
      { name: 'file3.txt', size: 3000000, type: 'text/plain', progress: 100 },
      { name: 'file4.txt', size: 3000000, type: 'text/plain', error: 'Error uploading file' }
    ],
    onDelete: (file: FileListItem) => {
      console.log('delete', file);
    }
  },
  render: (args) => <FileList {...args} />
} satisfies Story;
