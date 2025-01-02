import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '@/components/ui/icon';

const meta = {
  component: Icon
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof Icon>;

export const Example = {
  args: {
    icon: 'RiLineChartLine',
    size: 20
  },
  render: (args) => (
    <>
      <div className='flex items-center'>
        <Icon {...args} />
        &nbsp;
        <span>{args.icon}</span>
      </div>
      <div className='pt-4'>
        <a className='text-blue-700' href='https://remixicon.com/' target='_blank' rel='noreferrer'>
          You can add icons from the list here
        </a>
      </div>
    </>
  )
} satisfies Story;
