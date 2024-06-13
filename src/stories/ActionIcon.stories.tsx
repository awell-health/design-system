import { ActionIcon, ActionType } from "@/components/ui/action-icon";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ActionIcon> = {
  component: ActionIcon,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ActionIcon>;

export const Example: Story = {
  render: (args) => <ActionIcon {...args} />, 
  args: {
    icon_url: "https://www.vectorlogo.zone/logos/twilio/twilio-icon.svg"
  },
};
