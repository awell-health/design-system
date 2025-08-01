import { Badge } from '@/components/ui/badge/badge';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Badge,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'primary',
        'error',
        'warning',
        'success',
        'yellow',
        'lime',
        'cyan',
        'teal',
        'violet',
        'pink'
      ]
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'lg']
    },
    children: {
      control: { type: 'text' }
    }
  }
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof Badge>;

export const Example = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Label'
  },
  render: (args) => <Badge {...args} />
} satisfies Story;

export const AllVariants = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Badge variant='default'>Default</Badge>
      <Badge variant='primary'>Primary</Badge>
      <Badge variant='error'>Error</Badge>
      <Badge variant='warning'>Warning</Badge>
      <Badge variant='success'>Success</Badge>
      <Badge variant='yellow'>Yellow</Badge>
      <Badge variant='lime'>Lime</Badge>
      <Badge variant='cyan'>Cyan</Badge>
      <Badge variant='teal'>Teal</Badge>
      <Badge variant='violet'>Violet</Badge>
      <Badge variant='pink'>Pink</Badge>
    </div>
  )
} satisfies Story;

export const Sizes = {
  render: () => (
    <div className='flex items-center gap-4'>
      <Badge size='sm'>Small Badge</Badge>
      <Badge size='lg'>Large Badge</Badge>
    </div>
  )
} satisfies Story;

export const TextOverflow = {
  name: 'Text Overflow Handling',
  render: () => (
    <div className='space-y-6 max-w-2xl'>
      <div>
        <h3 className='text-sm font-medium mb-2'>
          Natural growth - badges grow with content when space allows
        </h3>
        <div className='flex flex-wrap gap-2'>
          <Badge size='sm' variant='primary'>
            Short
          </Badge>
          <Badge size='sm' variant='error'>
            Medium length text
          </Badge>
          <Badge size='sm' variant='success'>
            This is a longer badge text that grows naturally
          </Badge>
          <Badge size='lg' variant='warning'>
            Large badge with even longer text content that spans naturally
          </Badge>
        </div>
      </div>

      <div>
        <h3 className='text-sm font-medium mb-2'>
          Constrained space - text truncates gracefully with ellipsis
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <div className='w-32 border border-gray-200 p-2 rounded bg-gray-50'>
            <p className='text-xs text-gray-600 mb-1'>Width: 8rem</p>
            <Badge variant='primary' size='sm'>
              This badge text is too long for this container
            </Badge>
          </div>
          <div className='w-24 border border-gray-200 p-2 rounded bg-gray-50'>
            <p className='text-xs text-gray-600 mb-1'>Width: 6rem</p>
            <Badge variant='error' size='sm'>
              Super long badge text
            </Badge>
          </div>
        </div>
      </div>

      <div>
        <h3 className='text-sm font-medium mb-2'>
          Flex containers - badges adapt to available space
        </h3>
        <div className='flex gap-2 w-96 border border-gray-200 p-2 rounded bg-gray-50'>
          <Badge variant='cyan' size='sm'>
            Status
          </Badge>
          <Badge variant='yellow' size='sm'>
            This badge will take available space and truncate if needed
          </Badge>
          <Badge variant='violet' size='sm'>
            End
          </Badge>
        </div>
      </div>

      <div>
        <h3 className='text-sm font-medium mb-2'>Mixed sizes handling overflow</h3>
        <div className='w-64 border border-gray-200 p-2 rounded bg-gray-50 space-y-2'>
          <div>
            <Badge size='sm' variant='primary'>
              Small badge with very long text that demonstrates truncation
            </Badge>
          </div>
          <div>
            <Badge size='lg' variant='success'>
              Large badge with very long text that also demonstrates truncation behavior
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
} satisfies Story;
