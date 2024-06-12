// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";

import { Icon, IconType } from "@/components/ui/icon";

const meta = {
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof Icon>;

function IconDemo(args) {
  return (
    <>
      <div className="flex items-center">
        <Icon {...args} />
        &nbsp;
        <span>{args.icon}</span>
      </div>
      <div className="pt-4">
        <a className="text-blue-600" href="https://remixicon.com/" target="_blank">
          You can add icons from the list here
        </a>
      </div>
    </>
  );
}

export const Example = {
  args: {
    icon: "RiLineChartLine",
    size: 20,
  },
  render: (args) => <IconDemo  {...args}/>,
} satisfies Story;
