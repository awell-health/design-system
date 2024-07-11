import { Textarea } from '@/components/ui/textarea';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Textarea
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Example = {
  args: {
    helpText: 'Helper text',
    label: 'Textarea Label',
    placeholder: 'Type your text here',
    hasError: false
  },
  render: (args) => <Textarea {...args} />
} satisfies Story;
