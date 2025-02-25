import { Input } from '@/components/ui/form/input';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../components';

const meta = {
  component: Input
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Example = {
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
    helpText: 'Some text to help user',
    disabled: false,
    hasError: false,
    suffixIcon: <Icon icon='RiSearchLine' size={16} />,
    prefixIcon: <Icon icon='RiContractRightLine' size={16} />
  },
  render: (args) => <Input {...args} />
} satisfies Story;
