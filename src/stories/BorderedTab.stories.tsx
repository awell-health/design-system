import { BorderedTab, BorderedTabItem } from "@/components/ui/bordered-tab";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BorderedTab> = {
  component: BorderedTab,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof BorderedTab>;

  const onClick = (item: BorderedTabItem) => {
    console.log(item.id)
  };

  const items: BorderedTabItem[] = [
    { id: '1', label: 'First', onClick },
    { id: '2', label: 'Second', onClick },
    { id: '3', label: 'Third', onClick },
  ];

export const Example: Story = {
  render: (args) => <div className="flex flex-col gap-4"><BorderedTab {...args} items={items} selected={items[0].id} /></div>,
  args: {},
} 
