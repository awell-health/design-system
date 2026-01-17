import type { Meta, StoryObj } from '@storybook/react';
import {
  DateTimeRangeSelector,
  DateInput,
  TimeInput,
  DateTimeInput
} from '@/components/ui/date-time-range-selector';
import { addDays, subDays } from 'date-fns';

const meta = {
  title: 'Components/DateTimeRangeSelector',
  component: DateTimeRangeSelector,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    onUpdate: { action: 'onUpdate' },
    align: {
      control: 'select',
      options: ['start', 'center', 'end']
    },
    showPresets: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    }
  }
} satisfies Meta<typeof DateTimeRangeSelector>;

export default meta;

type Story = StoryObj<typeof DateTimeRangeSelector>;

export const Default: Story = {
  args: {
    onUpdate: ({ range }) =>
      console.log('Date range changed:', {
        from: range.from?.toISOString(),
        to: range.to?.toISOString()
      })
  },
  render: (args) => <DateTimeRangeSelector {...args} />
};

export const WithInitialDates: Story = {
  args: {
    initialDateFrom: subDays(new Date(), 7),
    initialDateTo: new Date(),
    onUpdate: ({ range }) =>
      console.log('Date range changed:', {
        from: range.from?.toISOString(),
        to: range.to?.toISOString()
      })
  },
  render: (args) => <DateTimeRangeSelector {...args} />
};

export const WithStringDates: Story = {
  args: {
    initialDateFrom: subDays(new Date(), 14).toISOString(),
    initialDateTo: addDays(new Date(), 7).toISOString(),
    onUpdate: ({ range }) =>
      console.log('Date range changed:', {
        from: range.from?.toISOString(),
        to: range.to?.toISOString()
      })
  },
  render: (args) => <DateTimeRangeSelector {...args} />
};

export const WithoutPresets: Story = {
  args: {
    showPresets: false,
    onUpdate: ({ range }) =>
      console.log('Date range changed:', {
        from: range.from?.toISOString(),
        to: range.to?.toISOString()
      })
  },
  render: (args) => <DateTimeRangeSelector {...args} />
};

export const CustomPresets: Story = {
  args: {
    presets: [
      { name: 'today', label: 'Today' },
      { name: 'yesterday', label: 'Yesterday' },
      { name: 'last7', label: 'Past Week' },
      { name: 'thisMonth', label: 'This Month' }
    ],
    onUpdate: ({ range }) =>
      console.log('Date range changed:', {
        from: range.from?.toISOString(),
        to: range.to?.toISOString()
      })
  },
  render: (args) => <DateTimeRangeSelector {...args} />
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Choose your date range...',
    onUpdate: ({ range }) =>
      console.log('Date range changed:', {
        from: range.from?.toISOString(),
        to: range.to?.toISOString()
      })
  },
  render: (args) => <DateTimeRangeSelector {...args} />
};

export const Disabled: Story = {
  args: {
    disabled: true,
    initialDateFrom: subDays(new Date(), 7),
    initialDateTo: new Date(),
    onUpdate: () => {}
  },
  render: (args) => <DateTimeRangeSelector {...args} />
};

export const AlignEnd: Story = {
  args: {
    align: 'end',
    onUpdate: ({ range }) =>
      console.log('Date range changed:', {
        from: range.from?.toISOString(),
        to: range.to?.toISOString()
      })
  },
  render: (args) => (
    <div className='flex justify-end w-[800px]'>
      <DateTimeRangeSelector {...args} />
    </div>
  )
};

export const AlignCenter: Story = {
  args: {
    align: 'center',
    onUpdate: ({ range }) =>
      console.log('Date range changed:', {
        from: range.from?.toISOString(),
        to: range.to?.toISOString()
      })
  },
  render: (args) => (
    <div className='flex justify-center w-[800px]'>
      <DateTimeRangeSelector {...args} />
    </div>
  )
};

// Sub-component stories
export const DateInputStory: StoryObj<typeof DateInput> = {
  name: 'DateInput Component',
  render: () => {
    const [date, setDate] = React.useState(new Date());
    return (
      <div className='space-y-4'>
        <h3 className='text-sm font-medium'>Date Input Component</h3>
        <DateInput value={date} onChange={setDate} />
        <p className='text-xs text-slate-500'>Selected: {date.toLocaleDateString()}</p>
      </div>
    );
  }
};

import * as React from 'react';

export const TimeInputStory: StoryObj<typeof TimeInput> = {
  name: 'TimeInput Component',
  render: () => {
    const [time, setTime] = React.useState(new Date());
    return (
      <div className='space-y-4'>
        <h3 className='text-sm font-medium'>Time Input Component</h3>
        <TimeInput value={time} onChange={setTime} />
        <p className='text-xs text-slate-500'>Selected: {time.toLocaleTimeString()}</p>
      </div>
    );
  }
};

export const DateTimeInputStory: StoryObj<typeof DateTimeInput> = {
  name: 'DateTimeInput Component',
  render: () => {
    const [dateTime, setDateTime] = React.useState(new Date());
    return (
      <div className='space-y-4'>
        <h3 className='text-sm font-medium'>DateTime Input Component</h3>
        <DateTimeInput value={dateTime} onChange={setDateTime} label='Select Date & Time' />
        <p className='text-xs text-slate-500'>Selected: {dateTime.toLocaleString()}</p>
      </div>
    );
  }
};

export const AllSubComponents: StoryObj = {
  name: 'All Sub-Components',
  render: () => {
    const [date, setDate] = React.useState(new Date());
    const [time, setTime] = React.useState(new Date());
    const [dateTime, setDateTime] = React.useState(new Date());

    return (
      <div className='space-y-8 p-4'>
        <div className='space-y-2'>
          <h3 className='text-sm font-semibold text-slate-700'>Date Input</h3>
          <p className='text-xs text-slate-500'>Individual date input with month/day/year fields</p>
          <DateInput value={date} onChange={setDate} />
          <p className='text-xs text-blue-600'>Selected: {date.toLocaleDateString()}</p>
        </div>

        <div className='space-y-2'>
          <h3 className='text-sm font-semibold text-slate-700'>Time Input</h3>
          <p className='text-xs text-slate-500'>12-hour time input with AM/PM toggle</p>
          <TimeInput value={time} onChange={setTime} />
          <p className='text-xs text-blue-600'>Selected: {time.toLocaleTimeString()}</p>
        </div>

        <div className='space-y-2'>
          <h3 className='text-sm font-semibold text-slate-700'>DateTime Input</h3>
          <p className='text-xs text-slate-500'>Combined date and time input</p>
          <DateTimeInput value={dateTime} onChange={setDateTime} label='Event Date & Time' />
          <p className='text-xs text-blue-600'>Selected: {dateTime.toLocaleString()}</p>
        </div>
      </div>
    );
  }
};
