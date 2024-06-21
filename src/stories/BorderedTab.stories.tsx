// Replace your-framework with the name of your framework
import { BorderedTab, BorderedTabItem } from "@/components/ui/bordered-tab";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta = {
  component: BorderedTab,
} satisfies Meta<typeof BorderedTab>;

export default meta;

type Story = StoryObj<typeof BorderedTab>;

function BorderedTabDemo() {
  const onClick = (item: BorderedTabItem) => {
    setSelected(item.id)
  };

  const items: BorderedTabItem[] = [
    { id: '1', label: 'First', onClick },
    { id: '2', label: 'Second', onClick },
    { id: '3', label: 'Third', onClick },
  ];

  const [selected, setSelected] = useState<string>(items[0].id)

  return (
    <div className="flex flex-col gap-4">
      <BorderedTab items={items} selected={selected} />
    </div>
    
  );
}

export const Example = {
  args: {},
  render: () => <BorderedTabDemo />,
} satisfies Story;
