import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '@/components/ui/icon';
import { ICONS, IconType } from '@/components/ui/icon/types';

const meta = {
  component: Icon
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof Icon>;

export const IconGallery = {
  render: () => (
    <div className='p-4'>
      <div className='grid grid-cols-6 gap-4'>
        {(Object.keys(ICONS) as IconType[]).map((iconName) => (
          <div key={iconName} className='flex flex-col items-center p-2'>
            <Icon icon={iconName} size={24} />
            <div className='text-xs'>{iconName}</div>
          </div>
        ))}
      </div>
      <div className='pt-4'>
        <a className='text-blue-700' href='https://remixicon.com/' target='_blank' rel='noreferrer'>
          You can add icons from the list here
        </a>
      </div>
    </div>
  )
} satisfies Story;
