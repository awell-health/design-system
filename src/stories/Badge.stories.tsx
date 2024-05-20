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
    <>
      <h3 className="py-4 text-lg">Variants</h3>
      <div className="flex gap-4 py-">
        <Badge>default</Badge>
        <Badge variant="primary">primary</Badge>
        <Badge variant="error">error</Badge>
        <Badge variant="warning">warning</Badge>
        <Badge variant="success">success</Badge>
        <Badge variant="yellow">yellow</Badge>
        <Badge variant="lime">lime</Badge>
        <Badge variant="teal">teal</Badge>
        <Badge variant="cyan">cyan</Badge>
        <Badge variant="pink">pink</Badge>
        <Badge variant="violet">violet</Badge>
      </div>
      
      <h3 className="py-4 pb-2 text-lg">Sizing</h3>
      <div className="flex gap-4 py-2">
        <Badge variant="primary" size="lg">
          lg
        </Badge>
        <Badge variant="primary" size="sm">
          sm
        </Badge>
      </div>
    </>
  );
}

export const Example = {
  args: {},
  render: () => <BadgeDemo />,
} satisfies Story;
