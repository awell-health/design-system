// Replace your-framework with the name of your framework
import { Textarea } from "@/components/ui/textarea";
import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  component: Textarea,
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof Textarea>;

function TextareaDemo() {
  return (
    <Textarea placeholder="Type your text here"></Textarea>
  );
}

export const Example = {
  args: {},
  render: () => <TextareaDemo />,
} satisfies Story;
