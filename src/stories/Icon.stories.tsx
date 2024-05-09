// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";

import { Icon, IconType } from "@/components/ui/icon";

const meta = {
  component: Icon,
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof Icon>;

function IconDemo() {
  const key: IconType = "RiLineChartLine";

  return (
    <>
      <div>
        <Icon icon={key as unknown as IconType} />
        &nbsp;
        <span>{key}</span>
      </div>
      <div className="pt-4">
        <a className="text-blue-600" href="https://remixicon.com/" target="_blank">
          Full Icon list here
        </a>
      </div>
    </>
  );
}

export const Example = {
  args: {},
  render: () => <IconDemo />,
} satisfies Story;
