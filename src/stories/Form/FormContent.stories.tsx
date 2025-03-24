import type { Meta, StoryObj } from '@storybook/react';
import { FormContent } from '../../components/ui/form/form-content';

const meta = {
  component: FormContent
} satisfies Meta<typeof FormContent>;

export default meta;

type Story = StoryObj<typeof FormContent>;

export const Example = {
  args: {
    children: <div>Child test content</div>
  },
  render: (args) => <FormContent {...args} />
} satisfies Story;
