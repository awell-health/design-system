import { describe, expect, it } from 'vitest';

import React from 'react';
import { SkeletonLoader } from './skeleton-loader';
import { render } from '@testing-library/react';

describe('SkeletonLoader', () => {
  it('match snapshot', () => {
    const { container } = render(<SkeletonLoader />);

    expect(container).toMatchSnapshot();
  });
});
