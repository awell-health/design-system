// Replace your-framework with the name of your framework
import { Pagination } from "@/components/ui/pagination";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof Pagination>;


export const Example = {
  args: {
    totalCount: 78,
    onPageChange: (page) => { console.log('page', page) }
  },
  render: (args) => <Pagination {...args} />,
} satisfies Story;
