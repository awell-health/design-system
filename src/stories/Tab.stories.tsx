import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Tab, TabItem } from '../components';

const meta = {
  component: Tab
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof Tab>;

const items: TabItem[] = [
  { id: '1', label: 'First', onClick: fn() },
  { id: '2', label: 'Second', onClick: fn() },
  { id: '3', label: 'Third', onClick: fn() }
];

export const Example = {
  args: {
    items,
    size: 'md',
    variant: 'default',
    selected: '1',
    fullWidth: true
  },
  render: (args) => <Tab {...args} />
} satisfies Story;
