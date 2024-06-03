// Replace your-framework with the name of your framework
import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Example = {
  args: {
    variant: "primary",
    shape: null,
    size: "sm",
    disabled: false,
  },
  parameters: {
    design: {
      type: "iframe",
      url: "https://www.figma.com/design/DxDvdWXaeqG736djgf9Zom/Turtle-UI-(WIP)?node-id=40-13",
    },
  },
  render: (args) => (
    <Button {...args}>{args.shape ? "x" : `Button ${args.variant}`}</Button>
  ),
} satisfies Story;
