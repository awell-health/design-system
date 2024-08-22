import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@/components/ui/spinner';

const meta = {
  component: Spinner
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Example = {
  args: {
    size: 'lg'
  },
  render: (args) => <Spinner {...args} />
} satisfies Story;
