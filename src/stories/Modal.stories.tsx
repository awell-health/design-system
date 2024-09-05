import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '@/components/ui/modal';

const meta = {
  component: Modal
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof Modal>;

export const Example = {
  args: {
    onClose: () => false,
    children: <div>Content</div>
  },
  render: (args) => <Modal {...args} />
} satisfies Story;
