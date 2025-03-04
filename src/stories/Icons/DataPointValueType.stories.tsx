import { DataPointIcon, DataPointValueType } from '@/components/ui/data-point-icon';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DataPointIcon> = {
  component: DataPointIcon,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof DataPointIcon>;

export const Example: Story = {
  render: (args) => <DataPointIcon {...args} />,
  args: {
    dataPointValueType: DataPointValueType.Attachment
  }
};
