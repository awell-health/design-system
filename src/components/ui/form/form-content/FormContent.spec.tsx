import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import FormContent from './FormContent';

describe('FormContent', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <FormContent>
        <div>Child test content</div>
      </FormContent>
    );
    expect(container).toMatchSnapshot();
  });
});
