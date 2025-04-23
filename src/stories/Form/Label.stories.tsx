import { Label } from '@/components/ui/form/label';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Label
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof Label>;

export const Example = {
  args: {
    label: 'Top level label',
    sublabel: 'Sublabel helper text',
    required: true
  },
  render: (args) => <Label {...args} />
} satisfies Story;
