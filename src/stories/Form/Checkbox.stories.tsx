import { Checkbox } from '@/components/ui/form/checkbox';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Checkbox
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Example = {
  args: {
    type: 'checkbox',
    checked: false,
    label: 'Checkbox Label',
    disabled: false,
    indeterminate: false,
    inputSize: 'sm',
    helpText: 'This is help text'
  },
  render: (args) => <Checkbox {...args} />
} satisfies Story;
