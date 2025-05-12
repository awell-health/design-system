import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '../../icon/icon';
import { Tooltip } from './tooltip';
import { PlateEditor } from '@udecode/plate/react';
import { getPluginType } from '@udecode/plate';
import { BaseBoldPlugin, BaseItalicPlugin, BaseUnderlinePlugin } from '@udecode/plate-basic-marks';

interface CustomToolbarProps {
  editor: PlateEditor;
  className?: string;
}

export const CustomToolbar: FC<CustomToolbarProps> = ({ editor, className }) => {
  const isBlockActive = (type: string) => {
    if (!editor.selection) return false;
    const nodes = Array.from(editor.api.nodes());
    return nodes.some(([node]) => node.type === type);
  };

  return (
    <div
      className={cn(
        'flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg',
        className
      )}
    >
      <Tooltip content='Bold'>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.tf.toggleMark(getPluginType(editor, BaseBoldPlugin));
          }}
          className={cn(
            'p-1.5 rounded hover:bg-gray-200',
            editor.marks?.[getPluginType(editor, BaseBoldPlugin)] && 'bg-gray-200'
          )}
        >
          <Icon icon='RiText' className='w-4 h-4' />
        </button>
      </Tooltip>
      <Tooltip content='Italic'>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.tf.toggleMark(getPluginType(editor, BaseItalicPlugin));
          }}
          className={cn(
            'p-1.5 rounded hover:bg-gray-200',
            editor.marks?.[getPluginType(editor, BaseItalicPlugin)] && 'bg-gray-200'
          )}
        >
          <Icon icon='RiTextSnippet' className='w-4 h-4' />
        </button>
      </Tooltip>
      <Tooltip content='Underline'>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.tf.toggleMark(getPluginType(editor, BaseUnderlinePlugin));
          }}
          className={cn(
            'p-1.5 rounded hover:bg-gray-200',
            editor.marks?.[getPluginType(editor, BaseUnderlinePlugin)] && 'bg-gray-200'
          )}
        >
          <Icon icon='RiLinksLine' className='w-4 h-4' />
        </button>
      </Tooltip>
      <div className='w-px h-6 bg-gray-200 mx-1' />
      <Tooltip content='Bullet List'>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.tf.toggleBlock('ul', { wrap: true });
            editor.tf.toggleBlock('li');
          }}
          className={cn('p-1.5 rounded hover:bg-gray-200', isBlockActive('li') && 'bg-gray-200')}
        >
          <Icon icon='RiListCheck' className='w-4 h-4' />
        </button>
      </Tooltip>
      <Tooltip content='Numbered List'>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.tf.toggleBlock('ol', { wrap: true });
            editor.tf.toggleBlock('li');
          }}
          className={cn('p-1.5 rounded hover:bg-gray-200', isBlockActive('li') && 'bg-gray-200')}
        >
          <Icon icon='RiListOrdered2' className='w-4 h-4' />
        </button>
      </Tooltip>
    </div>
  );
};
