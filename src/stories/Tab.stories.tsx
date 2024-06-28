// Replace your-framework with the name of your framework
import { Tab, TabItem } from "@/components/ui/tab";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from '@storybook/test';

const meta = {
  component: Tab,
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof Tab>;

const items: TabItem[] = [
  { id: "1", label: "First", onClick: fn() },
  { id: "2", label: "Second", onClick: fn() },
  { id: "3", label: "Third", onClick: fn() },
];

export const Example = {
  args: {
    items,
    variant: "default",
    selected: "1",
    fullWidth: true,
  },
  render: (args) => <Tab {...args} />,
} satisfies Story;
