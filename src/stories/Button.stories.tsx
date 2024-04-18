// Replace your-framework with the name of your framework
import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

function ButtonDemo() {
  return (
    <div className="flex gap-4">
      <Button>default</Button>
      <Button variant={"secondary"}>secondary</Button>
      <Button variant={"destructive"}>destructive</Button>
      <Button variant={"outline"}>outline</Button>
    </div>
  );
}

export const Example = {
  args: {},
  render: () => <ButtonDemo />,
} satisfies Story;
