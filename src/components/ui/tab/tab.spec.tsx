import { render } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { Tab } from './tab';
import { TabItem } from './types';

describe('Tab', () => {
  it('match snapshot', () => {
    const items: TabItem[] = [
      { id: '1', label: 'First', onClick: vi.fn() },
      { id: '2', label: 'Second', onClick: vi.fn() },
      { id: '3', label: 'Third', onClick: vi.fn() }
    ];

    const { container } = render(<Tab items={items} />);

    expect(container).toMatchSnapshot();
  });
});
