import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '../../components/ui/form/toggle/toggle';

const meta = {
  component: Toggle
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Example = {
  args: {
    checked: false,
    label: 'Label',
    helpText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    disabled: false,
    onChange: () => {},
    variant: 'default',
    toggleSize: 'md'
  },
  render: (args) => <Toggle {...args} />
} satisfies Story;
