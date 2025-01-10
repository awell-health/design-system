import type { Meta, StoryObj } from '@storybook/react';
import { DateRangeSelect } from '@/components/ui/date-range-select';
import { addDays } from 'date-fns';

const meta = {
  component: DateRangeSelect,
  argTypes: {}
} satisfies Meta<typeof DateRangeSelect>;

export default meta;

type Story = StoryObj<typeof DateRangeSelect>;

export const Example = {
  args: {
    onSelect: (from: string, to: string) => console.log('Date range changed:', { from, to }),
    defaultFromDate: addDays(new Date(), -7).toISOString(),
    defaultToDate: new Date().toISOString()
  },
  render: (args) => <DateRangeSelect {...args} />
} satisfies Story;