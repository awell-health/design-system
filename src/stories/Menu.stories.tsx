import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from '../components/ui/menu/Menu';
import { Badge, Icon } from '../components';

const meta = {
  component: Menu
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof Menu>;

export const Example = {
  args: {
    items: [
      {
        label: 'Single Item',
        icon: <Icon icon='RiHomeLine' />,
        badge: <Badge>3</Badge>
      },
      {
        label: 'Parent Item',
        icon: <Icon icon='RiLineChartLine' />,
        badge: <Badge>2</Badge>,
        children: [
          {
            label: 'First child'
          },
          {
            label: 'Second child',
            children: [{ label: 'Second level child' }]
          }
        ]
      }
    ]
  },
  render: (args) => <Menu {...args} />
} satisfies Story;
