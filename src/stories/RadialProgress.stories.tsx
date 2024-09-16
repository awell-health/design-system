import type { Meta, StoryObj } from '@storybook/react';

import { RadialProgress } from '..';

const meta: Meta<typeof RadialProgress> = {
  component: RadialProgress,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof RadialProgress>;

export const Example: Story = {
  args: {},
  render: () => (
    <RadialProgress value={40}>
      <h3>40%</h3>
    </RadialProgress>
  )
};
