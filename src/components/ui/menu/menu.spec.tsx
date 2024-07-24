import { fireEvent, render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Menu } from './Menu';

describe('Menu', () => {
  const subject = (props = {}) => {
    const defaultProps = {
      items: [
        {
          label: 'Single Item'
        },
        {
          label: 'Parent Item',
          children: [
            {
              label: 'First child'
            },
            {
              label: 'Second child',
              children: [{ label: 'Second level child' }]
            }
          ]
        }
      ]
    };
    return render(<Menu {...defaultProps} {...props} />);
  };

  it('match snapshot', () => {
    expect(subject().container).toMatchSnapshot();
  });

  it('renders icon', () => {
    const { getByText } = subject({
      items: [{ label: 'Test', icon: <div>icon</div> }]
    });

    expect(getByText('icon')).toBeVisible();
  });

  it('renders badge', () => {
    const { getByText } = subject({
      items: [{ label: 'Test', badge: <span>badge</span> }]
    });

    expect(getByText('badge')).toBeVisible();
  });

  it('opens children menu', () => {
    const { getByText } = subject();

    expect(getByText('First child')).not.toBeVisible();

    fireEvent.click(getByText('Parent Item'));

    expect(getByText('First child')).toBeVisible();
  });

  it('opens second level children menu', () => {
    const { getByText } = subject();

    expect(getByText('Second level child')).not.toBeVisible();

    fireEvent.click(getByText('Parent Item'));
    fireEvent.click(getByText('Second child'));

    expect(getByText('Second level child')).toBeVisible();
  });
});
