import type { Meta, StoryObj } from '@storybook/react';

import { AlertDialog } from '@/components/ui/alert-dialog/alert-dialog';
import { Icon } from '..';

const meta = {
  component: AlertDialog,
  args: {
    title: 'Modal title',
    text: 'Some text to display when modal is open',
    button: undefined,
    children: <div className='py-4'>SOME CHILD CONTENT</div>,
    onClose: undefined,
    secondaryButton: undefined
  }
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof AlertDialog>;

export const Example = {
  args: {
    secondaryButton: {
      label: 'Cancel',
      buttonAction: () => alert('secondary click')
    },
    button: {
      label: 'Redirect',
      buttonAction: () => alert('button click')
    },
    onClose: () => alert('closed'),
    icon: (
      // I think it is better to keep it flexible as an icon (JSX prop)
      // I haven't found succes/error variants in design system for now
      <div className='w-11 h-11 rounded-full bg-red-100 flex items-center justify-center'>
        <div className='w-9 h-9 rounded-full bg-red-200 flex items-center justify-center'>
          <Icon icon='RiAlertFill' size={24} className='fill-red-600' />
        </div>
      </div>
    )
  },
  render: (args) => <AlertDialog {...args} />
} satisfies Story;
