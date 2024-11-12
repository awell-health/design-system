import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from '../components';

const meta = {
  component: Drawer
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Example = {
  args: {
    children: <div>hello</div>,
    isOpen: false
  },
  render: (args) => <Drawer {...args} />
} satisfies Story;
