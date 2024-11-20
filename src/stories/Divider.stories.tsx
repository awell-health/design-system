import { Divider } from '@/components/ui/divider';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Divider
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof Divider>;

export const Example = {
  render: () => <Divider />
} satisfies Story;
