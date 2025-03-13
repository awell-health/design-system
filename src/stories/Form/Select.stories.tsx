import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectValue } from '@/components/ui/form/select';
import { Icon } from '../../components';

const meta = {
  component: Select
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof Select>;

const defaultProps = {
  label: 'Select Label',
  isMulti: false,
  disabled: false,
  isSearchable: false,
  icon: <Icon icon='RiSearchLine' />,
  hasError: false,
  onChange: (option: SelectValue) => {
    if (option !== null) {
      console.log('Selected value:', option);
    } else {
      console.log('No value selected');
    }
  }
};

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

export const Example = {
  args: { ...defaultProps, options },
  render: (args) => <Select {...args} />
} satisfies Story;

const optionsWithGroups = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' }
    ]
  },
  {
    label: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'lettuce', label: 'Lettuce' },
      { value: 'potato', label: 'Potato' }
    ]
  }
];

export const ExampleWithGroups = {
  args: { ...defaultProps, options: optionsWithGroups },
  render: (args) => <Select {...args} />
} satisfies Story;

export const ExampleWithCustomOption = {
  args: {
    ...defaultProps,
    options,
    CustomOptionComponent: (label: string) => (
      <div className='text-red-500'>Custom Option: {label}</div>
    )
  },
  render: (args) => <Select {...args} />
} satisfies Story;
