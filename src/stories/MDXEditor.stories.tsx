import { useState } from 'react';
import { MDXEditor } from '@/components/ui/mdx-editor';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: MDXEditor,
  title: 'Extended/MDXEditor',
  parameters: {
    docs: {
      description: {
        component:
          'A markdown editor component based on @mdxeditor/editor. Supports headings, bold, italic, underline, lists, and more.'
      }
    }
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The markdown content value'
    },
    onChange: {
      action: 'changed',
      description: 'Callback when the content changes'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the editor is disabled/read-only'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when the editor is empty'
    },
    hasError: {
      control: 'boolean',
      description: 'Whether the editor has an error state'
    }
  }
} satisfies Meta<typeof MDXEditor>;

export default meta;

type Story = StoryObj<typeof MDXEditor>;

const MDXEditorWithState = (args: React.ComponentProps<typeof MDXEditor>) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <MDXEditor
      {...args}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        args.onChange?.(newValue);
      }}
    />
  );
};

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Start typing your markdown...',
    disabled: false,
    hasError: false
  },
  render: (args) => <MDXEditorWithState {...args} />
};

export const WithContent: Story = {
  args: {
    value: `# Hello World

This is a **markdown** editor with _formatting_ support.

## Features

- Bold, italic, underline
- Headings (H1-H4)
- Bullet lists
- Numbered lists

### Try it out!

1. First item
2. Second item
3. Third item
`,
    placeholder: 'Start typing...',
    disabled: false,
    hasError: false
  },
  render: (args) => <MDXEditorWithState {...args} />
};

export const Disabled: Story = {
  args: {
    value: `# Read-only Content

This editor is in **disabled** mode. The toolbar is hidden and content cannot be edited.

- Item 1
- Item 2
`,
    placeholder: 'Start typing...',
    disabled: true,
    hasError: false
  },
  render: (args) => <MDXEditorWithState {...args} />
};

export const WithError: Story = {
  args: {
    value: '',
    placeholder: 'This field has an error...',
    disabled: false,
    hasError: true
  },
  render: (args) => <MDXEditorWithState {...args} />
};
