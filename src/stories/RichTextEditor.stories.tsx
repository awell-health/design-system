import { Meta, StoryObj } from '@storybook/react';
import { RichTextEditor } from '../components/ui/rich-text';

const meta: Meta<typeof RichTextEditor> = {
  component: RichTextEditor,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-[500px]'>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

// Example content as a stringified Slate document
const basicContent = JSON.stringify([
  {
    type: 'p',
    children: [
      { text: 'This is a ' },
      { text: 'rich', bold: true },
      { text: ' text ' },
      { text: 'editor', italic: true },
      { text: ' component.' }
    ]
  },
  {
    type: 'p',
    children: [{ text: 'Try editing the content using the toolbar above!' }]
  }
]);

// Example with all formatting options
const formattingContent = JSON.stringify([
  {
    type: 'h1',
    children: [{ text: 'Rich Text Editor Features' }]
  },
  {
    type: 'p',
    children: [{ text: 'The editor supports various text formatting options:' }]
  },
  {
    type: 'ul',
    children: [
      {
        type: 'li',
        children: [{ text: 'Bold text: ', bold: true }, { text: 'Use for emphasis' }]
      },
      {
        type: 'li',
        children: [{ text: 'Italic text: ', italic: true }, { text: 'Use for quotes or terms' }]
      },
      {
        type: 'li',
        children: [
          { text: 'Underlined text: ', underline: true },
          { text: 'Use for links or emphasis' }
        ]
      }
    ]
  },
  {
    type: 'p',
    children: [{ text: 'You can also create:' }]
  },
  {
    type: 'ul',
    children: [
      {
        type: 'li',
        children: [{ text: 'Bullet lists' }]
      },
      {
        type: 'li',
        children: [{ text: 'Nested lists' }]
      }
    ]
  },
  {
    type: 'ol',
    children: [
      {
        type: 'li',
        children: [{ text: 'Numbered lists' }]
      },
      {
        type: 'li',
        children: [{ text: 'Ordered sequences' }]
      }
    ]
  }
]);

export const Basic: Story = {
  args: {
    label: 'Basic Editor',
    content: basicContent,
    onChange: (content) => console.log('Content changed:', content)
  }
};

export const Formatting: Story = {
  args: {
    label: 'Formatting Options',
    content: formattingContent,
    onChange: (content) => console.log('Content changed:', content)
  }
};

export const EmptyEditor: Story = {
  args: {
    label: 'Empty Editor',
    content: JSON.stringify([
      {
        type: 'p',
        children: [{ text: '' }]
      }
    ]),
    onChange: (content) => console.log('Content changed:', content)
  }
};
