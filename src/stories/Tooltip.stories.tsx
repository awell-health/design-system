import { Tooltip } from '@/components/ui/tooltip';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Example: Story = {
  render: (args) => (
    <div className='w-64 h-64 flex items-center justify-center'>
      <Tooltip {...args}>
        <button className='btn'>Tooltip</button>
      </Tooltip>
    </div>
  ),
  args: {
    variant: 'default',
    placement: 'top',
    datatip:
      'Tooltip.message.aisdjais.djiaosdjiaosjdioasjdioajsdoijasiojdioasjdioasjdoiasjdaiosdjasoidjasoidjasiodjasd',
    id: 'test',
    float: false
  }
};
