import { describe, expect, it } from 'vitest';

import { Avatar } from './avatar';
import React from 'react';
import { render } from '@testing-library/react';

describe('Avatar', () => {
  it('match image snapshot', () => {
    const { container } = render(
      <Avatar src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"' />
    );

    expect(container).toMatchSnapshot();
  });

  it('match placeholder snapshot', () => {
    const { container } = render(<Avatar placeholder text='SV' />);

    expect(container).toMatchSnapshot();
  });
});
