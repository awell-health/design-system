// Replace your-framework with the name of your framework
import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "../components/ui/icon";


const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

function ButtonDemo() {
  return (
  <>
        <div className="flex gap-4 py-4">
      <Button>default</Button>
      <Button variant="primary">primary</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="success">success</Button>
      <Button variant="warning">warning</Button>
      <Button variant="error">error</Button>
    </div>
    <div className="flex gap-4 py-4">
      <Button size="lg">large</Button>
      <Button >default</Button>
      <Button size="sm">small</Button>
      <Button size="xs">tiny</Button>
    </div>
    <div className="flex gap-4 py-4">
      <Button shape={"circle"}><Icon icon="RiAccountBoxFill" /></Button>
      <Button shape={"square"}>S</Button>
    </div>
  </>
  );
}

export const Example = {
  args: {},
  render: () => <ButtonDemo />,
} satisfies Story;
