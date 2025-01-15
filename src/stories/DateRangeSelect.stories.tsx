import type { Meta, StoryObj } from '@storybook/react';
import { DateRangeSelect } from '@/components/ui/date-range-select';
import { addDays } from 'date-fns';

const meta = {
  component: DateRangeSelect,
  argTypes: {}
} satisfies Meta<typeof DateRangeSelect>;

export default meta;

type Story = StoryObj<typeof DateRangeSelect>;

export const InitialDates = {
  args: {
    onSelect: (from: string, to: string) => console.log('Date range changed:', { from, to }),
    defaultDateRange: {
      from: addDays(new Date(), -7).toISOString(),
      to: new Date().toISOString()
    }
  },
  render: (args) => <DateRangeSelect {...args} />
} satisfies Story;

export const NoInitialDates = {
  args: {
    onSelect: (from: string, to: string) => console.log('Date range changed:', { from, to })
  },
  render: (args) => <DateRangeSelect {...args} />
} satisfies Story;
