import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownItem } from '@/components/ui/dropdown';
import { fn } from '@storybook/test';
import { Icon } from '../components/ui/icon';

const meta = {
  component: Dropdown
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof Dropdown>;

const items: DropdownItem[] = [
  { label: 'Test 1', onClick: fn, disabled: true },
  {
    label: (
      <>
        <Icon icon='RiAccountPinBoxFill' />
        JSX item
      </>
    ),
    onClick: fn
  }
];

export const Example = {
  args: {
    placement: 'right',
    items,
    buttonLabel: (
      <>
        <Icon icon='RiMore2Line' /> Menu
      </>
    ),
    buttonClassNames: 'border-none shadow-none',
    itemClassNames: ''
  },
  render: (args) => <Dropdown {...args} />
} satisfies Story;
