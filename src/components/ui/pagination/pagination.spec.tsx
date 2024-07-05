import { render } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { Pagination } from './pagination';

describe('Pagination', () => {
  const subject = (props = {}) => {
    const defaultProps = {
      totalCount: 86,
      onPageChange: vi.fn()
    };

    render(<Pagination {...defaultProps} {...props} />);
  };

  it('match snapshot', () => {
    expect(subject()).toMatchSnapshot();
  });
});
