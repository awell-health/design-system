import { CopyText } from '@/components/ui/copy-text';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: CopyText
} satisfies Meta<typeof CopyText>;

export default meta;

type Story = StoryObj<typeof CopyText>;

export const Example = {
  args: {
    text: 'this text was copied to the clipboard',
    children: <span>Hover to copy with click!</span>,
  },
  render: (args) => <div className='flex flex-col gap-4'>
    <CopyText {...args} />
    </div>
} satisfies Story;
