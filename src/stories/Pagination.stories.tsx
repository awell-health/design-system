import { Pagination } from '@/components/ui/pagination';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
  component: Pagination
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Example = {
  args: {
    totalCount: 146,
    onPageChange: fn(),
    perPage: 10,
    page: 3
  },
  render: (args) => <Pagination {...args} />
} satisfies Story;
