import { ListInput } from '@/components/ui/form/list-input';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: ListInput
} satisfies Meta<typeof ListInput>;

export default meta;

type Story = StoryObj<typeof ListInput>;

export const Example = {
  args: {
    value: ['test', 'test2', 'test3'],
    onChange: (items: string[]) => {
      console.log(items);
    },
    helperText: 'Hit enter or click + to add a new item',
    placeholder: 'Type to add an item',
    label: 'List Input',
    required: true
  },
  render: (args) => <ListInput {...args} />
} satisfies Story;
