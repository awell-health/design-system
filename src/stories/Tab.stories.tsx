// Replace your-framework with the name of your framework
import { Tab, TabItem } from "@/components/ui/tab";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta = {
  component: Tab,
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof Tab>;

function TabDemo() {
  const onClick = (item: TabItem) => {
    setSelected(item.id)
  };

  const items: TabItem[] = [
    { id: '1', label: 'First', onClick },
    { id: '2', label: 'Second', onClick },
    { id: '3', label: 'Third', onClick },
  ];

  const [selected, setSelected] = useState<string>(items[0].id)

  return (
    <div className="flex flex-col gap-4">
      <Tab items={items} selected={selected} />
    </div>
    
  );
}

export const Example = {
  args: {},
  render: () => <TabDemo />,
} satisfies Story;
