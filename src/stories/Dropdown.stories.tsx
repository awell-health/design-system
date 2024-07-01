// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
import { Icon } from "..";
import { fn } from "@storybook/test";

const meta = {
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof Dropdown>;

const items: DropdownItem[] = [
  { label: "Test 1", onClick: fn },
  {
    label: (
      <>
        <Icon icon="RiAccountPinBoxFill" />
        JSX item
      </>
    ),
    onClick: fn,
  },
];

export const Example = {
  args: {
    placement: "right",
    items,
    buttonLabel: <><Icon icon="RiMore2Line" /> Menu</>,
    buttonClassNames: "border-none shadow-none",
    itemClassNames: ''
  },
  render: (args) => <Dropdown {...args} />,
} satisfies Story;
