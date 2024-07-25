import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from '../components/ui/menu';
import { Icon } from '../components';

const meta = {
  component: Menu
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof Menu>;

export const Example = {
  args: {
    items: [
      { label: 'Home', icon: <Icon icon='RiHomeLine' /> },
      {
        label: 'Design',
        icon: <Icon icon='RiEditCircleLine' />,
        children: [{ label: 'Care flows' }, { label: 'Templates' }, { label: 'Form Library' }]
      },
      { label: 'Operate', icon: <Icon icon='RiPulseFill' /> },
      { label: 'Improve', icon: <Icon icon='RiLineChartLine' /> }
    ]
  },
  render: (args) => <Menu {...args} />
} satisfies Story;
