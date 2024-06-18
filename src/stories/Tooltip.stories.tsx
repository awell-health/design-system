import { Tooltip } from "@/components/ui/tooltip";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  argTypes: {
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Example: Story = {
  render: (args) => <Tooltip {...args}><button className="btn">Tooltip</button></Tooltip>, 
  args: {
    variant: 'default',
    placement: 'right',
    datatip: 'Tooltip message'
  },
}
