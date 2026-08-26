import type { Meta, StoryObj } from '@storybook/react';

import { AlertDialog } from '@/components/ui/alert-dialog/alert-dialog';
import { Icon } from '..';

const CARD_COLORS = [
  'bg-red-400',
  'bg-orange-400',
  'bg-amber-400',
  'bg-emerald-400',
  'bg-teal-400',
  'bg-sky-400',
  'bg-indigo-400',
  'bg-purple-400'
];

const DemoBackground = () => (
  <div className='fixed inset-0 grid grid-cols-4 gap-4 p-8 bg-white'>
    {Array.from({ length: 16 }).map((_, index) => (
      <div
        key={index}
        className={`${CARD_COLORS[index % CARD_COLORS.length]} rounded-lg h-24 flex items-center justify-center text-white text-sm font-medium`}
      >
        Card {index + 1}
      </div>
    ))}
  </div>
);

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
      label: (
        <div className='flex items-center gap-2'>
          <Icon icon='RiArrowRightLine' size={12} />
          Redirect
        </div>
      ),
      buttonAction: () => alert('button click'),
      buttonVariant: 'error'
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

export const OverlayDefault = {
  render: (args) => (
    <>
      <DemoBackground />
      <AlertDialog {...args} />
    </>
  )
} satisfies Story;

export const OverlayFullBlur = {
  args: {
    overlayClassName: 'bg-transparent backdrop-blur-md'
  },
  render: (args) => (
    <>
      <DemoBackground />
      <AlertDialog {...args} />
    </>
  )
} satisfies Story;

export const OverlayNone = {
  args: {
    overlayClassName: 'bg-transparent'
  },
  render: (args) => (
    <>
      <DemoBackground />
      <AlertDialog {...args} />
    </>
  )
} satisfies Story;

export const OverlayTintAndBlur = {
  args: {
    overlayClassName: 'bg-slate-900/10 backdrop-blur-sm'
  },
  render: (args) => (
    <>
      <DemoBackground />
      <AlertDialog {...args} />
    </>
  )
} satisfies Story;
