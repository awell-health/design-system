// Replace your-framework with the name of your framework
import { Tooltip } from "@/components/ui/tooltip";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof Tooltip>;

function TooltipDemo() {
  return (
    <>
      <div className="flex gap-8 p-10">
      <Tooltip datatip={"Tooltip message"} className="tooltip-open mr-10">
        <button className="btn">Tooltip</button>
      </Tooltip>
      <Tooltip variant={"light"} datatip={"Tooltip message"} className="tooltip-open">
        <button className="btn">Tooltip light</button>
      </Tooltip>
    </div>
    </>
  );
}

export const Example = {
  args: {},
  render: () => <TooltipDemo />,
} satisfies Story;
