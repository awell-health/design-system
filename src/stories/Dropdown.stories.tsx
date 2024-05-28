// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
import { Icon } from "..";

const meta = {
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof Dropdown>;

function DropdownDemo() {
  const onClick = () => { console.log('click') }

  const items: DropdownItem[] = [
    { label: "Test 1", onClick }, 
    { label: <><Icon icon="RiAccountPinBoxFill"/>JSX item</>, onClick }
  ]

  return (
    <div className="flex gap-4">
      <Dropdown buttonLabel={"Open"} items={items} />
      <Dropdown 
        buttonLabel={<Icon icon="RiMore2Line" />} 
        items={items} 
        buttonClassNames="bg-white border-none shadow-none"
      />
      <div className="divider" />
      <Dropdown buttonLabel={"Open"} items={items} placement="top" />
      <Dropdown buttonLabel={"Open"} items={items} placement="left" />
      <Dropdown buttonLabel={"Open"} items={items} placement="bottom" />
      <Dropdown buttonLabel={"Open"} items={items} placement="right" />
    </div>
  );
}

export const Example = {
  args: {},
  render: () => <DropdownDemo />,
} satisfies Story;
