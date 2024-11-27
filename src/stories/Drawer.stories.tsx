import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from '../components';

const meta = {
  component: Drawer
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof Drawer>;
export const ControlledDrawer = {
  args: {
    children: <div>hello</div>,
    isOpen: false,
    side: 'right',
    drawerWidth: 460
  },
  render: (args) => (
    <div className='grid grid-rows-[4rem_1fr] h-screen'>
      <div className='bg-blue-100'>
        the app header
      </div>
      <main className='relative overflow-hidden'>
        <div className='bg-red-100 w-full h-full'>
          this is the main content
        </div>
        <Drawer {...args} />
      </main>
    </div>
  )
} satisfies Story;
