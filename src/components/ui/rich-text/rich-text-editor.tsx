import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Plate, PlateContent, usePlateEditor } from '@udecode/plate/react';
import { Value } from '@udecode/slate';
import { Icon } from '../icon/icon';
import { getPluginType } from '@udecode/plate';
import {
  BaseBoldPlugin,
  BaseItalicPlugin,
  BaseUnderlinePlugin,
  BaseStrikethroughPlugin,
  BaseCodePlugin
} from '@udecode/plate-basic-marks';
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from './toolbar/toolbar';
import { parseStringSlateContent } from './utils';
import { plugins } from './plugins';
import { type RichTextProps, components } from './rich-text';

export interface RichTextEditorProps extends Omit<RichTextProps, 'editable'> {
  /**
   * Callback function to handle changes to the rich text content
   */
  onChange?: (content: string) => void;
}

export const RichTextEditor: FC<RichTextEditorProps> = ({
  content,
  label,
  className,
  onChange
}) => {
  // Parse the content
  const parsedContent = parseStringSlateContent(content) as Value;

  // Use the Plate editor hook with components
  const editor = usePlateEditor({
    plugins,
    value: parsedContent,
    components
  });

  const isBlockActive = (type: string) => {
    if (!editor.selection) return false;
    const nodes = Array.from(editor.api.nodes());
    return nodes.some(([node]) => node.type === type);
  };

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
          <Toolbar className='p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg'>
            {/* Text Style Group */}
            <ToolbarGroup>
              <ToolbarButton
                tooltip='Bold'
                pressed={editor.marks?.[getPluginType(editor, BaseBoldPlugin)]}
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.tf.toggleMark(getPluginType(editor, BaseBoldPlugin));
                }}
              >
                <Icon icon='RiBold' className='w-4 h-4' />
              </ToolbarButton>
              <ToolbarButton
                tooltip='Italic'
                pressed={editor.marks?.[getPluginType(editor, BaseItalicPlugin)]}
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.tf.toggleMark(getPluginType(editor, BaseItalicPlugin));
                }}
              >
                <Icon icon='RiItalic' className='w-4 h-4' />
              </ToolbarButton>
              <ToolbarButton
                tooltip='Underline'
                pressed={editor.marks?.[getPluginType(editor, BaseUnderlinePlugin)]}
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.tf.toggleMark(getPluginType(editor, BaseUnderlinePlugin));
                }}
              >
                <Icon icon='RiUnderline' className='w-4 h-4' />
              </ToolbarButton>
              <ToolbarButton
                tooltip='Strikethrough'
                pressed={editor.marks?.[getPluginType(editor, BaseStrikethroughPlugin)]}
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.tf.toggleMark(getPluginType(editor, BaseStrikethroughPlugin));
                }}
              >
                <Icon icon='RiStrikethrough' className='w-4 h-4' />
              </ToolbarButton>
              <ToolbarButton
                tooltip='Code'
                pressed={editor.marks?.[getPluginType(editor, BaseCodePlugin)]}
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.tf.toggleMark(getPluginType(editor, BaseCodePlugin));
                }}
              >
                <Icon icon='RiCodeFill' className='w-4 h-4' />
              </ToolbarButton>
            </ToolbarGroup>

            <ToolbarSeparator />

            {/* Block Style Group */}
            <ToolbarGroup>
              <ToolbarButton
                tooltip='Heading 1'
                pressed={isBlockActive('h1')}
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.tf.toggleBlock('h1');
                }}
              >
                <Icon icon='RiH1' className='w-4 h-4' />
              </ToolbarButton>
              <ToolbarButton
                tooltip='Heading 2'
                pressed={isBlockActive('h2')}
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.tf.toggleBlock('h2');
                }}
              >
                <Icon icon='RiH2' className='w-4 h-4' />
              </ToolbarButton>
              <ToolbarButton
                tooltip='Heading 3'
                pressed={isBlockActive('h3')}
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.tf.toggleBlock('h3');
                }}
              >
                <Icon icon='RiH3' className='w-4 h-4' />
              </ToolbarButton>
            </ToolbarGroup>

            <ToolbarSeparator />

            {/* List Group */}
            <ToolbarGroup>
              <ToolbarButton
                tooltip='Bullet List'
                pressed={isBlockActive('li')}
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.tf.toggleBlock('ul', { wrap: true });
                  editor.tf.toggleBlock('li');
                }}
              >
                <Icon icon='RiListCheck' className='w-4 h-4' />
              </ToolbarButton>
              <ToolbarButton
                tooltip='Numbered List'
                pressed={isBlockActive('li')}
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.tf.toggleBlock('ol', { wrap: true });
                  editor.tf.toggleBlock('li');
                }}
              >
                <Icon icon='RiListOrdered2' className='w-4 h-4' />
              </ToolbarButton>
            </ToolbarGroup>
          </Toolbar>
          <PlateContent className='focus:outline-none px-3.5 py-2.5' />
        </Plate>
      </div>
    </div>
  );
};
