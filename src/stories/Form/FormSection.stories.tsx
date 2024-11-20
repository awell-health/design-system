import type { Meta, StoryObj } from '@storybook/react';
import { FormSection } from '@/components/ui/form/form-section';
import { Input } from '../../components';

const meta = {
  component: FormSection
} satisfies Meta<typeof FormSection>;

export default meta;

type Story = StoryObj<typeof FormSection>;

export const Example = {
  args: {
    title: 'Form Section Title',
    hint: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  render: (args) => (
    <FormSection {...args}>
      <div className='flex flex-col gap-4'>
        <Input />
      </div>
    </FormSection>
  )
} satisfies Story;
