import { Button } from '@/components/ui/button/button';
import { Icon } from '@/components/ui/icon';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Button
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Example = {
  args: {
    variant: 'primary',
    shape: null,
    size: 'sm',
    disabled: false
  },
  parameters: {
    design: {
      type: 'iframe',
      url: 'https://www.figma.com/design/DxDvdWXaeqG736djgf9Zom/Turtle-UI-(WIP)?node-id=40-13'
    }
  },
  render: (args) => (
    <Button {...args}>
      {args.shape ? (
        <Icon size={args.shape === 'squareLg' ? 20 : 16} icon='RiDeleteBinFill' />
      ) : (
        `Button ${args.variant}`
      )}
    </Button>
  )
} satisfies Story;
