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
    iconOnly: false,
    items: [
      { label: 'Home', icon: <Icon icon='RiHomeLine' />, active: true },
      {
        label: 'Design',
        icon: <Icon icon='RiEditCircleLine' />,
        isExpanded: true,
        children: [
          { label: 'Care flows' },
          { label: 'Templates' },
          { label: 'Form Library', active: true }
        ]
      },
      { label: 'Operate', icon: <Icon icon='RiPulseFill' /> },
      { label: 'Improve', icon: <Icon icon='RiLineChartLine' /> }
    ]
  },
  render: (args) => <Menu {...args} />
} satisfies Story;
