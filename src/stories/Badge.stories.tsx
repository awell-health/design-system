import { Badge } from '@/components/ui/badge/badge';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Badge
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof Badge>;

export const Example = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Label'
  },
  render: (args) => <Badge {...args} />
} satisfies Story;
