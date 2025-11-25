import { type FC } from 'react';
import {
  MDXEditor as BaseMDXEditor,
  headingsPlugin,
  listsPlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  BlockTypeSelect,
  Separator
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { cn } from '../../../lib/utils';

export interface MDXEditorProps {
  /**
   * The markdown content value
   */
  value: string;
  /**
   * Callback when the content changes
   */
  onChange: (value: string) => void;
  /**
   * Whether the editor is disabled/read-only
   */
  disabled?: boolean;
  /**
   * Placeholder text when the editor is empty
   */
  placeholder?: string;
  /**
   * Whether the editor has an error state
   */
  hasError?: boolean;
  /**
   * Additional class names to apply to the container
   */
  className?: string;
}

export const MDXEditor: FC<MDXEditorProps> = ({
  value,
  onChange,
  disabled = false,
  placeholder = '',
  hasError = false,
  className
}) => {
  const basePlugins = [
    headingsPlugin({ allowedHeadingLevels: [1, 2, 3, 4] }),
    listsPlugin(),
    thematicBreakPlugin(),
    markdownShortcutPlugin()
  ];

  const plugins = disabled
    ? basePlugins
    : [
        ...basePlugins,
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <Separator />
              <BoldItalicUnderlineToggles />
              <Separator />
              <BlockTypeSelect />
              <Separator />
              <ListsToggle options={['bullet', 'number']} />
            </>
          )
        })
      ];

  return (
    <div
      className={cn(
        'border rounded-md min-h-[200px]',
        hasError ? 'border-red-500' : 'border-gray-200',
        className
      )}
    >
      <BaseMDXEditor
        markdown={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={disabled}
        contentEditableClassName="prose prose-sm max-w-none p-3"
        plugins={plugins}
      />
    </div>
  );
};
