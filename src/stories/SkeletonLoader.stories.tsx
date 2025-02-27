import type { Meta, StoryObj } from '@storybook/react';
import { SkeletonLoader } from '@/components/ui/skeleton-loader';

const meta = {
  component: SkeletonLoader
} satisfies Meta<typeof SkeletonLoader>;

export default meta;

type Story = StoryObj<typeof SkeletonLoader>;

export const Example = {
  args: {
    className: 'h-2'
  },
  render: (args) => <SkeletonLoader {...args} />
} satisfies Story;
