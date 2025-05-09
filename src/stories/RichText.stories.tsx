import { Meta, StoryObj } from '@storybook/react';
import { RichText } from '../components/ui/rich-text/rich-text';
import { 
  ImagePlugin, 
  VideoPlugin, 
  AudioPlugin, 
  FilePlugin,
  MediaEmbedPlugin 
} from '@udecode/plate-media/react';

const meta: Meta<typeof RichText> = {
  component: RichText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RichText>;

// Example content as a stringified Slate document
const basicContent = JSON.stringify([
  {
    type: 'p',
    children: [
      { text: 'This is a ' },
      { text: 'rich', bold: true },
      { text: ' text ' },
      { text: 'viewer', italic: true },
      { text: ' component.' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'It supports ' },
      { text: 'various', bold: true, italic: true },
      { text: ' text formatting.' },
    ],
  },
]);

// Example with text formatting
const formattingContent = JSON.stringify([
  {
    type: 'h1',
    children: [
      { text: 'Text Formatting' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'The RichText component supports various text formatting:' },
    ],
  },
  {
    type: 'ul',
    children: [
      {
        type: 'li',
        children: [
          { text: 'Bold Text: ', bold: true },
          { text: 'Use this for emphasizing important content.'},
        ],
      },
      {
        type: 'li',
        children: [
          { text: 'Italic Text: ', italic: true },
          { text: 'Use this for highlighting terms or quotes.'},
        ],
      },
      {
        type: 'li',
        children: [
          { text: 'Underlined Text: ', underline: true },
          { text: 'Use this sparingly for special emphasis.'},
        ],
      },
      {
        type: 'li',
        children: [
          { text: 'Strikethrough: ', strikethrough: true },
          { text: 'Use this to show deleted or outdated content.'},
        ],
      },
      {
        type: 'li',
        children: [
          { text: 'Code: ', code: true },
          { text: 'For displaying inline code snippets.'},
        ],
      },
      {
        type: 'li',
        children: [
          { text: 'Subscript: ', subscript: true },
          { text: 'For mathematical or chemical expressions.'},
        ],
      },
      {
        type: 'li',
        children: [
          { text: 'Superscript: ', superscript: true },
          { text: 'Also for mathematical or reference notation.'},
        ],
      },
    ],
  },
]);

// Example with headings and blockquotes
const headingsContent = JSON.stringify([
  {
    type: 'h1',
    children: [
      { text: 'Heading 1' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'Major section heading, typically used for main titles.' },
    ],
  },
  {
    type: 'h2',
    children: [
      { text: 'Heading 2' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'Sub-section heading, used for dividing content into logical groups.' },
    ],
  },
  {
    type: 'h3',
    children: [
      { text: 'Heading 3' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'Minor heading for smaller content divisions.' },
    ],
  },
  {
    type: 'blockquote',
    children: [
      {
        text: 'This is a blockquote. Use it for quoting external sources or highlighting important statements within your content.'
      },
    ],
  },
]);

// Example with lists
const listsContent = JSON.stringify([
  {
    type: 'h2',
    children: [
      { text: 'List Examples' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'The component supports both ordered and unordered lists:' },
    ],
  },
  {
    type: 'h3',
    children: [
      { text: 'Bulleted List' },
    ],
  },
  {
    type: 'ul',
    children: [
      {
        type: 'li',
        children: [{ text: 'First item' }],
      },
      {
        type: 'li',
        children: [{ text: 'Second item with ' }, { text: 'bold', bold: true }, { text: ' text' }],
      },
      {
        type: 'li',
        children: [
          { text: 'Third item with nested list:' },
          {
            type: 'ul',
            children: [
              {
                type: 'li',
                children: [{ text: 'Nested item 1' }],
              },
              {
                type: 'li',
                children: [{ text: 'Nested item 2' }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'h3',
    children: [
      { text: 'Numbered List' },
    ],
  },
  {
    type: 'ol',
    children: [
      {
        type: 'li',
        children: [{ text: 'First step' }],
      },
      {
        type: 'li',
        children: [{ text: 'Second step' }],
      },
      {
        type: 'li',
        children: [{ text: 'Third step' }],
      },
    ],
  },
]);

// Example with links
const linksContent = JSON.stringify([
  {
    type: 'h2',
    children: [
      { text: 'Links' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'The component properly renders links: ' },
      {
        type: 'a',
        url: 'https://example.com',
        children: [{ text: 'Example Website' }],
      },
      { text: '.' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'Links can also have ' },
      {
        type: 'a',
        url: 'https://example.org',
        children: [{ text: 'formatting ', bold: true }, { text: 'applied', italic: true }],
      },
      { text: ' to them.' },
    ],
  },
]);

// Example with media elements
const mediaContent = JSON.stringify([
  {
    type: 'h2',
    children: [
      { text: 'Media Elements' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'The RichText component can display various media elements:' },
    ],
  },
  {
    type: ImagePlugin.key,
    url: 'https://framerusercontent.com/images/YMywktF3AnINPDBPGK4Gc5xTbgM.jpg?scale-down-to=1024',
    children: [{ text: '' }],
  },
  {
    type: 'p',
    children: [
      { text: 'Above is an example image. The component can also display videos, audio, and file attachments when provided in the content.' },
    ],
  },
  {
    type: VideoPlugin.key,
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    children: [{ text: '' }],
  },
  {
    type: 'p',
    children: [
      { text: 'Above is an example video.' },
    ],
  },
  {
    type: AudioPlugin.key,
    url: 'https://www.w3schools.com/html/horse.mp3',
    children: [{ text: '' }],
  },
  {
    type: 'p',
    children: [
      { text: 'Above is an example audio element.' },
    ],
  },
  {
    type: FilePlugin.key,
    url: 'https://example.com/sample.pdf',
    name: 'sample-document.pdf',
    children: [{ text: '' }],
  },
  {
    type: MediaEmbedPlugin.key,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    children: [{ text: '' }],
  },
]);

// Comprehensive example with all elements (without media elements for now)
const comprehensiveContent = JSON.stringify([
  {
    type: 'h1',
    children: [
      { text: 'Rich Text Viewer Component' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'This is a demonstration of all the elements supported by the RichText viewer component.' },
    ],
  },
  {
    type: 'h2',
    children: [
      { text: 'Text Formatting' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'Text can be ' },
      { text: 'bold', bold: true },
      { text: ', ' },
      { text: 'italic', italic: true },
      { text: ', ' },
      { text: 'underlined', underline: true },
      { text: ', or ' },
      { text: 'strikethrough', strikethrough: true },
      { text: '. You can also have ' },
      { text: 'code snippets', code: true },
      { text: ' inline.' },
    ],
  },
  {
    type: 'blockquote',
    children: [
      { text: 'This is a blockquote for highlighting important information or quotes from external sources.' },
    ],
  },
  {
    type: 'h2',
    children: [
      { text: 'Lists' },
    ],
  },
  {
    type: 'ul',
    children: [
      {
        type: 'li',
        children: [{ text: 'Unordered list item 1' }],
      },
      {
        type: 'li',
        children: [{ text: 'Unordered list item 2' }],
      },
    ],
  },
  {
    type: 'ol',
    children: [
      {
        type: 'li',
        children: [{ text: 'Ordered list item 1' }],
      },
      {
        type: 'li',
        children: [{ text: 'Ordered list item 2' }],
      },
    ],
  },
  {
    type: 'h2',
    children: [
      { text: 'Links' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'Here is a ' },
      {
        type: 'a',
        url: 'https://example.com',
        children: [{ text: 'link to an example website' }],
      },
      { text: '.' },
    ],
  },
]);

export const Basic: Story = {
  args: {
    label: 'Basic Rich Text',
    content: basicContent,
  },
};

export const TextFormatting: Story = {
  args: {
    label: 'Text Formatting Examples',
    content: formattingContent,
  },
};

export const Headings: Story = {
  args: {
    label: 'Headings & Blockquotes',
    content: headingsContent,
  },
};

export const Lists: Story = {
  args: {
    label: 'List Examples',
    content: listsContent,
  },
};

export const Links: Story = {
  args: {
    label: 'Link Examples',
    content: linksContent,
  },
};

export const Media: Story = {
  args: {
    label: 'Media Elements',
    content: mediaContent,
  },
};

export const Comprehensive: Story = {
  args: {
    label: 'All Features',
    content: comprehensiveContent,
  },
};

export const NoLabel: Story = {
  args: {
    content: basicContent,
  },
};

export const EmptyContent: Story = {
  args: {
    label: 'Empty Content',
    content: JSON.stringify([
      {
        type: 'p',
        children: [{ text: '' }],
      },
    ]),
  },
}; 