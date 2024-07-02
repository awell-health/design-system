import { Checkbox } from "@/components/ui/checkbox";
import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Example = {
  args: {
    label: 'Label',
    disabled: false,
    indeterminate: false,
    inputSize: 'md',
    helpText: 'This is help text'
  },
  render: (args) => <Checkbox {...args} />,
} satisfies Story;
