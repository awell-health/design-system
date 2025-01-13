import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectValue } from '@/components/ui/form/select';
import { Icon } from '../../components';

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
    label: 'Select Label',
    isMulti: false,
    options,
    disabled: false,
    isSearchable: false,
    icon: <Icon icon='RiSearchLine' />,
    onChange: (option: SelectValue) => {
      if (option !== null) {
        console.log('Selected value:', option);
      } else {
        console.log('No value selected');
      }
    }
  },
  render: (args) => <Select {...args} />
} satisfies Story;
