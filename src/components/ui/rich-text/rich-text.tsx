/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { withProps } from '@udecode/cn';
import {
  Plate,
  PlateContent,
  PlateElement,
  PlateLeaf,
  usePlateEditor,
  PlateEditor
} from '@udecode/plate/react';
import { Value } from '@udecode/slate';
import {
  ImagePlugin,
  VideoPlugin,
  AudioPlugin,
  FilePlugin,
  MediaEmbedPlugin
} from '@udecode/plate-media/react';
import { Icon } from '../icon/icon';

// Local imports
import { parseStringSlateContent } from './utils';
import { plugins } from './plugins';
import {
  SimpleImage,
  SimpleVideo,
  SimpleAudio,
  SimpleFile,
  SimpleMediaEmbed
} from './media-components';
import { getPluginType } from '@udecode/plate';
import { BaseBoldPlugin, BaseItalicPlugin, BaseUnderlinePlugin } from '@udecode/plate-basic-marks';

// Types
export interface RichTextProps {
  /**
   * The content to display in the rich text viewer
   */
  content: string;
  /**
   * Optional label for the rich text viewer
   */
  label?: string;
  /**
   * Additional class names to apply
   */
  className?: string;
  /**
   * Whether the rich text viewer is editable
   */
  editable?: boolean;
  /**
   * Callback function to handle changes to the rich text content
   */
  onChange?: (content: string) => void;
}

// Toolbar Component
const Toolbar = ({ editor }: { editor: PlateEditor }) => {
  const isBlockActive = (type: string) => {
    if (!editor.selection) return false;
    const nodes = Array.from(editor.api.nodes());
    return nodes.some(([node]) => node.type === type);
  };

  return (
    <div className='flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg'>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          editor.tf.toggleMark(getPluginType(editor, BaseBoldPlugin));
        }}
        className={cn(
          'p-1.5 rounded hover:bg-gray-200',
          editor.marks?.[getPluginType(editor, BaseBoldPlugin)] && 'bg-gray-200'
        )}
        title='Bold'
      >
        <Icon icon='RiText' className='w-4 h-4' />
      </button>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          editor.tf.toggleMark(getPluginType(editor, BaseItalicPlugin));
        }}
        className={cn(
          'p-1.5 rounded hover:bg-gray-200',
          editor.marks?.[getPluginType(editor, BaseItalicPlugin)] && 'bg-gray-200'
        )}
        title='Italic'
      >
        <Icon icon='RiTextSnippet' className='w-4 h-4' />
      </button>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          editor.tf.toggleMark(getPluginType(editor, BaseUnderlinePlugin));
        }}
        className={cn(
          'p-1.5 rounded hover:bg-gray-200',
          editor.marks?.[getPluginType(editor, BaseUnderlinePlugin)] && 'bg-gray-200'
        )}
        title='Underline'
      >
        <Icon icon='RiLinksLine' className='w-4 h-4' />
      </button>
      <div className='w-px h-6 bg-gray-200 mx-1' />
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          editor.tf.toggleBlock('ul', { wrap: true });
          editor.tf.toggleBlock('li');
        }}
        className={cn('p-1.5 rounded hover:bg-gray-200', isBlockActive('li') && 'bg-gray-200')}
        title='Bullet List'
      >
        <Icon icon='RiListCheck' className='w-4 h-4' />
      </button>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          editor.tf.toggleBlock('ol', { wrap: true });
          editor.tf.toggleBlock('li');
        }}
        className={cn('p-1.5 rounded hover:bg-gray-200', isBlockActive('li') && 'bg-gray-200')}
        title='Numbered List'
      >
        <Icon icon='RiListOrdered2' className='w-4 h-4' />
      </button>
    </div>
  );
};

// Main Component
export const RichText: FC<RichTextProps> = ({
  content,
  label,
  className,
  editable = false,
  onChange
}) => {
  // Parse the content
  const parsedContent = parseStringSlateContent(content) as Value;

  // Debug output to understand the structure
  useEffect(() => {
    console.log('Parsed content:', parsedContent);
  }, [parsedContent]);

  // Define component styling
  const components = {
    // Text elements
    p: withProps(PlateElement, {
      as: 'p',
      className: 'mb-2'
    }),
    blockquote: withProps(PlateElement, {
      as: 'blockquote',
      className: 'border-l-4 border-gray-200 pl-4 italic text-gray-600 my-2'
    }),

    // Heading elements
    h1: withProps(PlateElement, {
      as: 'h1',
      className: 'text-2xl font-bold my-3'
    }),
    h2: withProps(PlateElement, {
      as: 'h2',
      className: 'text-xl font-bold my-2'
    }),
    h3: withProps(PlateElement, {
      as: 'h3',
      className: 'text-lg font-semibold my-2'
    }),
    h4: withProps(PlateElement, {
      as: 'h4',
      className: 'text-base font-semibold my-2'
    }),
    h5: withProps(PlateElement, {
      as: 'h5',
      className: 'text-base font-semibold my-2'
    }),
    h6: withProps(PlateElement, {
      as: 'h6',
      className: 'text-base font-semibold my-2'
    }),

    // List elements
    ul: withProps(PlateElement, {
      as: 'ul',
      className: 'list-disc pl-6 my-2'
    }),
    ol: withProps(PlateElement, {
      as: 'ol',
      className: 'list-decimal pl-6 my-2'
    }),
    li: withProps(PlateElement, {
      as: 'li',
      className: 'my-1'
    }),
    lic: withProps(PlateElement, {
      as: 'span',
      className: 'block'
    }),

    // Link element
    a: withProps(PlateElement, {
      as: 'a',
      className: 'text-blue-500 underline hover:text-blue-700'
    }),

    // Media elements - using our custom components
    [ImagePlugin.key]: SimpleImage,
    [VideoPlugin.key]: SimpleVideo,
    [AudioPlugin.key]: SimpleAudio,
    [FilePlugin.key]: SimpleFile,
    [MediaEmbedPlugin.key]: SimpleMediaEmbed,

    // Text formatting (leaves)
    bold: withProps(PlateLeaf, {
      as: 'strong',
      className: 'font-bold'
    }),
    italic: withProps(PlateLeaf, {
      as: 'em',
      className: 'italic'
    }),
    underline: withProps(PlateLeaf, {
      as: 'u',
      className: 'underline'
    }),
    code: withProps(PlateLeaf, {
      as: 'code',
      className: 'bg-gray-100 rounded px-1 py-0.5 font-mono text-sm'
    }),
    strikethrough: withProps(PlateLeaf, {
      as: 's',
      className: 'line-through'
    }),
    subscript: withProps(PlateLeaf, {
      as: 'sub',
      className: 'text-xs align-sub'
    }),
    superscript: withProps(PlateLeaf, {
      as: 'sup',
      className: 'text-xs align-super'
    })
  };

  // Use the Plate editor hook with components
  const editor = usePlateEditor({
    plugins,
    value: parsedContent,
    components
  });

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && <div className='text-sm font-medium text-gray-700 mb-1'>{label}</div>}
      <div className={cn('relative rounded-lg border border-gray-200 bg-white')}>
        <Plate
          editor={editor}
          onChange={({ value }) => {
            if (onChange) {
              onChange(JSON.stringify(value));
            }
          }}
        >
          {editable && <Toolbar editor={editor} />}
          <PlateContent className='focus:outline-none px-3.5 py-2.5' readOnly={!editable} />
        </Plate>
      </div>
    </div>
  );
};
