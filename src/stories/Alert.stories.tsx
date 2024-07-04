import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '@/components/ui/alert';

const meta = {
  component: Alert
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof Alert>;

export const Example = {
  args: {
    variant: 'default',
    title: 'Heads up!',
    showIcon: true,
    children: 'This is the child content'
  },
  render: (args) => <Alert {...args} />
} satisfies Story;
