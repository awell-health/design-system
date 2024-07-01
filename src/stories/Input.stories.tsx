// Replace your-framework with the name of your framework
import { Input } from "@/components/ui/input";
import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Example = {
  args: {
    placeholder: 'Placeholder'
  },
  render: (args) => <Input {...args} />,
} satisfies Story;
