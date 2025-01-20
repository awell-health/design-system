import { describe, expect, it } from 'vitest';

import { CopyText } from './copy-text';
import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CopyText', () => {
  const subject = (position: 'right' | 'bottom' | 'overlay') =>
    render(
      <CopyText text='Hover to copy' position={position}>
        Hover to copy
      </CopyText>
    );

  it('match snapshot', () => {
    const { container } = subject('right');

    expect(container).toMatchSnapshot();
  });

  it('copies text to clipboard on click', async () => {
    const user = userEvent.setup();
    const { getByText } = subject('right');

    const copyTextElement = getByText('Hover to copy');
    await user.click(copyTextElement);

    const clipboardText = await navigator.clipboard.readText();
    expect(clipboardText).toBe('Hover to copy');
  });

  it('renders correctly with position bottom', () => {
    const { container } = subject('bottom');
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with position overlay', () => {
    const { container } = subject('overlay');
    expect(container).toMatchSnapshot();
  });
});
