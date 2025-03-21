import { CopyText } from '@/components/ui/copy-text';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: CopyText
} satisfies Meta<typeof CopyText>;

export default meta;

type Story = StoryObj<typeof CopyText>;

export const Example = {
  args: {
    text: 'Copied text from clipboard',
    children: <span className='text-gray-600 hover:text-gray-800'>Hover to copy with click!</span>,
    position: 'right'
  },
  render: (args) => <CopyText {...args} />
} satisfies Story;
