import { Icon } from '@/components/ui/icon';
import { Toast } from '@/components/ui/toast';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Toast> = {
  component: Toast,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Example: Story = {
  render: (args) => <Toast {...args} />,
  args: {
    horizontal: 'center',
    vertical: 'bottom',
    title: '“Patient Intake” has just been deleted.',
    text: 'Check out the all new dashboard view. Pages and exports now load faster.',
    icon: <Icon icon='RiDeleteBinFill' className='fill-red-600' />
  }
};
