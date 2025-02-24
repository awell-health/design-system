import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from '../components';

const meta = {
  component: FileUpload
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Example = {
  args: {
    label: 'Upload a file',
    onChange: (files: FileList) => {
      console.log(files);
    },
    error: 'This is an error',
    isMultiple: true,
    accept: ['.jpg', '.jpeg', '.png', '.pdf', '.doc', '.docx', '.txt'],
    maxSizeMb: 2
  },
  render: (args) => <FileUpload {...args} />
} satisfies Story;
