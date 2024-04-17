// Replace your-framework with the name of your framework
import { Input } from "@/components/ui/input";
import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

function InputDemo() {
  return (
    <Input placeholder="Placeholder" />
  );
}

export const Example = {
  args: {},
  render: () => <InputDemo />,
} satisfies Story;
