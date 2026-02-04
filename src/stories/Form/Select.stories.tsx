import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectItem, SelectValue } from '@/components/ui/form/select';
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
  },
  onCopy: (value: string) => {
    navigator.clipboard.writeText(value);
    console.log('Copied to clipboard:', value);
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

export const ExampleWithCustomOptionAndValue = {
  args: {
    ...defaultProps,
    options,
    CustomOptionComponent: (data: SelectItem) => (
      <div className='text-red-500'>Custom Option: {data.label}</div>
    ),
    SingleValueComponent: (data: SelectItem) => (
      <div className='text-blue-500'>
        Selected Single Value: {data.label} - {data.value}
      </div>
    )
  },
  render: (args) => <Select {...args} />
} satisfies Story;

export const ExampleWithCopyable = {
  args: {
    ...defaultProps,
    options,
    isCopyable: true,
    onCopy: (value: string) => {
      navigator.clipboard.writeText(value);
      console.log('Copied to clipboard:', value);
    }
  },
  render: (args) => <Select {...args} />
} satisfies Story;
