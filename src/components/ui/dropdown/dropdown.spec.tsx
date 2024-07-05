import { fireEvent, render } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { Dropdown } from './dropdown';
import { DropdownItem } from './types';

describe('Dropdown', () => {
  const clickMock = vi.fn();

  const items: DropdownItem[] = [
    { label: 'Test 1', onClick: clickMock },
    {
      label: <span>JSX item</span>,
      onClick: clickMock
    }
  ];

  it('match snapshot', () => {
    const result = render(<Dropdown items={items} buttonLabel={'Button Label'} />);

    expect(result).toMatchSnapshot();
  });

  it('triggers item click event', () => {
    const { getByText } = render(<Dropdown items={items} buttonLabel={'Button Label'} />);

    fireEvent.click(getByText('Test 1'));

    expect(clickMock).toHaveBeenCalledOnce();
  });
});
