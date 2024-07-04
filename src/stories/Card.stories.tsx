import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '@/components/ui/card';
import { Button } from '..';

const meta: Meta<typeof Card> = {
  component: Card,
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Example: Story = {
  args: {},
  render: () => (
    <Card className='w-64'>
      <h3>Title</h3>
      <p className='text-xs'>Description</p>
      <div className='flex justify-end'>
        <Button>Click me</Button>
      </div>
    </Card>
  )
};
