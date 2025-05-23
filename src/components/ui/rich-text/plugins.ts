// For a rich text viewer, we need a minimal set of plugins
// The styling will be handled by component configuration in rich-text.tsx

import { 
  BaseBoldPlugin,
  BaseItalicPlugin,
  BaseUnderlinePlugin,
  BaseStrikethroughPlugin,
  BaseCodePlugin,
  BaseSubscriptPlugin,
  BaseSuperscriptPlugin,
} from '@udecode/plate-basic-marks';
import {
  BaseListPlugin,
  BaseBulletedListPlugin,
  BaseNumberedListPlugin,
  BaseListItemPlugin,
  BaseListItemContentPlugin
} from '@udecode/plate-list';
import { BaseLinkPlugin } from '@udecode/plate-link';
import {
  ImagePlugin,
  VideoPlugin,
  AudioPlugin,
  FilePlugin,
  MediaEmbedPlugin
} from '@udecode/plate-media/react';
import { HeadingPlugin } from '@udecode/plate-heading/react';
import { BasePlugin } from '@udecode/plate';

// Add text formatting and list plugins
export const plugins: BasePlugin[] = [
  // Basic marks
  BaseBoldPlugin,
  BaseItalicPlugin,
  BaseUnderlinePlugin,
  BaseStrikethroughPlugin,
  BaseCodePlugin,
  BaseSubscriptPlugin,
  BaseSuperscriptPlugin,
  
  // Headings
  HeadingPlugin,
  
  // Lists
  BaseListPlugin as BasePlugin,
  BaseBulletedListPlugin,
  BaseNumberedListPlugin,
  BaseListItemPlugin,
  BaseListItemContentPlugin,
  
  // Links
  BaseLinkPlugin,
  
  // Media
  ImagePlugin as BasePlugin,
  VideoPlugin,
  AudioPlugin,
  FilePlugin,
  MediaEmbedPlugin,
]; 