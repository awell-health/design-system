import { Button } from '@/components/ui/button/button';
import { Card } from '@/components/ui/card/card';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta = {
  title: 'Animations/Custom Animations',
  parameters: {
    layout: 'centered'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const BlueRingAnimation: Story = {
  render: () => {
    const [items, setItems] = useState<
      Array<{ id: number; name: string; type: string; isRemoving?: boolean }>
    >([]);
    const [nextId, setNextId] = useState(1);

    const addItem = (type: string) => {
      const newItem = {
        id: nextId,
        name: `${type} ${nextId}`,
        type
      };
      setItems((prev) => [...prev, newItem]);
      setNextId((prev) => prev + 1);
    };

    const deleteItem = (id: number) => {
      // First mark as removing to trigger disappear animation
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isRemoving: true } : item))
      );

      // Then actually remove after animation duration
      setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }, 800); // matches the 0.8s animation duration
    };

    return (
      <div className='flex flex-col items-center gap-8 p-8 max-w-2xl'>
        <h2 className='text-xl font-semibold text-slate-700'>Blue Ring Animation Demo</h2>

        <p className='text-slate-600 text-center max-w-md'>
          Add new items to see the blue-700 ring animation. Each new item gets the animation when
          created!
        </p>

        <div className='flex gap-3 flex-wrap justify-center'>
          <Button onClick={() => addItem('Task')} variant='primary' size='sm'>
            Add Task
          </Button>
          <Button onClick={() => addItem('Note')} variant='secondary' size='sm'>
            Add Note
          </Button>
          <Button onClick={() => addItem('Reminder')} variant='secondary' size='sm'>
            Add Reminder
          </Button>
        </div>

        <div className='w-full'>
          {items.length === 0 ? (
            <Card className='p-6 text-center'>
              <p className='text-slate-500'>No items yet. Add some to see the animation!</p>
            </Card>
          ) : (
            <div className='space-y-3'>
              {items.map((item) => (
                <Card
                  key={item.id}
                  className={`p-4 flex justify-between items-center ${
                    item.isRemoving ? 'animate-disappear' : 'animate-appear'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <span
                      className={`badge ${
                        item.type === 'Task'
                          ? 'badge-primary'
                          : item.type === 'Note'
                            ? 'badge-secondary'
                            : 'badge-accent'
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className='text-slate-700'>{item.name}</span>
                  </div>
                  <Button
                    onClick={() => deleteItem(item.id)}
                    variant='ghost'
                    size='sm'
                    className='text-red-500 hover:text-red-700'
                  >
                    Delete
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className='text-xs text-slate-500 max-w-md text-center'>
          <strong>Class used:</strong>{' '}
          <code className='bg-slate-100 px-1 rounded'>animate-appear</code>
          <br />
          Each new item automatically gets the blue ring animation for 3 seconds!
        </div>
      </div>
    );
  }
};

export const MultipleElements: Story = {
  render: () => {
    const [animatingElements, setAnimatingElements] = useState<number[]>([]);

    const triggerElement = (index: number) => {
      setAnimatingElements((prev) => [...prev, index]);
      setTimeout(() => {
        setAnimatingElements((prev) => prev.filter((i) => i !== index));
      }, 3000);
    };

    const elements = [
      { type: 'button', content: 'Button Example' },
      { type: 'badge', content: 'Badge' },
      { type: 'input', content: 'Input Field' },
      { type: 'card', content: 'Card Element' }
    ];

    return (
      <div className='flex flex-col items-center gap-8 p-8'>
        <h2 className='text-xl font-semibold text-slate-700'>Animation on Different Elements</h2>

        <p className='text-slate-600 text-center max-w-md'>
          The animation works on any element. Click each element to see the blue ring effect.
        </p>

        <div className='grid grid-cols-2 gap-4'>
          {elements.map((element, index) => (
            <div key={index} className='flex flex-col items-center gap-2'>
              {element.type === 'button' && (
                <Button
                  className={animatingElements.includes(index) ? 'animate-appear' : ''}
                  onClick={() => triggerElement(index)}
                  variant='secondary'
                >
                  {element.content}
                </Button>
              )}

              {element.type === 'badge' && (
                <span
                  className={`badge badge-lg cursor-pointer ${animatingElements.includes(index) ? 'animate-appear' : ''}`}
                  onClick={() => triggerElement(index)}
                >
                  {element.content}
                </span>
              )}

              {element.type === 'input' && (
                <input
                  className={`input w-full ${animatingElements.includes(index) ? 'animate-appear' : ''}`}
                  placeholder='Click to animate'
                  onClick={() => triggerElement(index)}
                  readOnly
                />
              )}

              {element.type === 'card' && (
                <Card
                  className={`p-4 cursor-pointer ${animatingElements.includes(index) ? 'animate-appear' : ''}`}
                  onClick={() => triggerElement(index)}
                >
                  <p className='text-sm'>{element.content}</p>
                </Card>
              )}

              <span className='text-xs text-slate-500'>Click to animate</span>
            </div>
          ))}
        </div>

        <div className='text-xs text-slate-500 max-w-md text-center'>
          Each element can be animated independently. The ring adapts to the element&apos;s shape
          and size.
        </div>
      </div>
    );
  }
};
