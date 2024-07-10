import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../components/ui/select';
import { Icon } from '../components';

const meta = {
  component: Select
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof Select>;

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

export const Example = {
  args: {
    isMulti: false,
    options,
    isSearchable: false,
    icon: <Icon icon='RiSearchLine' />
  },
  render: (args) => <Select {...args} />
} satisfies Story;
