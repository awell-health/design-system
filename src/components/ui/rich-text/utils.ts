import { Node } from 'slate';
import { isNil, isEmpty } from 'lodash';

export const initialValue = [
  {
    type: 'p',
    children: [{ text: '' }]
  }
];

/**
 * This function parses a stringified slate document and returns a cleaned up, stringified slate document.
 * The cleaning up process consists of recursively finding Slate nodes that are of type ELEMENT_DYNAMIC_VARIABLE,
 * ELEMENT_CONSTANT OR ELEMENT_HOSTED_PAGES_LINK and replacing their children.text with {{{node.type:node.variableId}}}
 * @param content - stringified slate document
 * @returns - cleaned up, stringified slate document
 * @throws - error if the content is not a valid stringified slate document
 * @example
 * const content = '[{"type":"dynamic-variable","children":[{"text":"{{abcd}}"}]}]'
 * const parsed = parseStringSlateContent(content)
 * => [{"type":"p","children":[{"text":"{{{dynamic_variable:abcd}}}"}]}]
 * Note the change in casing of the type and the new text value
 *
 * NB: In the backend, the types are in snake_case, whereas in the FE they are in kebab-case
 *
 */
export const parseStringSlateContent = (content: string): Array<Node> => {
  try {
    if (isTextEmpty(content)) {
      return initialValue;
    }
    if (!isNil(content)) {
      const parsed = JSON.parse(content);
      return parsed;
    }
    return initialValue;
  } catch (error) {
    console.warn('Error parsing editor content', { error });
    return initialValue;
  }
};

export const isTextEmpty = (content: string): boolean => {
  if (isNil(content) || isEmpty(content)) {
    return true;
  }
  try {
    const nodes = (JSON.parse(content) ?? []) as Array<Node>;
    return !nodes.some(n => Node.string(n) !== '');
  } catch {
    return true;
  }
}; 