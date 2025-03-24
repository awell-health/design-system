import React from 'react';
import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { FormContent } from './form-content';

describe('FormContent', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <FormContent>
        <div>Child test content</div>
        <div>Child test content</div>
        <div>Child test content</div>
      </FormContent>
    );
    expect(container).toMatchSnapshot();
  });
});
