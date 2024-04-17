// Replace your-framework with the name of your framework
import { Badge } from "@/components/ui/badge";
import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof Badge>;

function BadgeDemo() {
  return (
    <div className="flex gap-4">
      <Badge>default</Badge>
      <Badge variant={"secondary"}>secondary</Badge>
      <Badge variant={"destructive"}>destructive</Badge>
      <Badge variant={"outline"}>outline</Badge>
    </div>
  );
}

export const Example = {
  args: {},
  render: () => <BadgeDemo />,
} satisfies Story;
