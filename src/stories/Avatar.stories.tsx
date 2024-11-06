import { Avatar } from '@/components/ui/avatar';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Avatar
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Example = {
  args: {
    variant: 'circle',
    size: 'sm',
    text: 'AV',
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"',
    placeholder: false
  },
  render: (args) => <Avatar {...args} />
} satisfies Story;
