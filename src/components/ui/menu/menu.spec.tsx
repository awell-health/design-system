import { fireEvent, render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Menu } from './Menu';

describe('Menu', () => {
  const subject = (props = {}) => {
    const defaultProps = {
      items: [
        {
          label: 'Single Item',
          icon: <>Icon 1</>,
          active: true
        },
        {
          label: 'Parent Item',
          icon: <>Parent Icon</>,
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

  it('renders a leaf item as a real link when href is set', () => {
    const { getByText } = subject({
      items: [{ label: 'Linked', href: '/somewhere' }]
    });

    const anchor = getByText('Linked').closest('a');
    expect(anchor).toHaveAttribute('href', '/somewhere');
    expect(anchor).not.toHaveAttribute('target');
    expect(anchor).not.toHaveAttribute('rel');
  });

  it('adds target and rel for external/new-tab links', () => {
    const { getByText } = subject({
      items: [{ label: 'New tab', href: 'https://example.com', target: '_blank' }]
    });

    const anchor = getByText('New tab').closest('a');
    expect(anchor).toHaveAttribute('href', 'https://example.com');
    expect(anchor).toHaveAttribute('target', '_blank');
    expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not set href on the anchor when omitted', () => {
    const { getByText } = subject({
      items: [{ label: 'Plain' }]
    });

    expect(getByText('Plain').closest('a')).not.toHaveAttribute('href');
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

  describe('when icon only is on', () => {
    it('shows only icons', () => {
      const { queryByText, container } = subject({ iconOnly: true });

      expect(queryByText('Single Item')).not.toBeInTheDocument();
      expect(queryByText('Icon 1')).toBeVisible();
      expect(container.querySelector('li>a.shadow')).toBeVisible();
    });

    it('doesn\t render children menu', () => {
      const { getByText, queryByText } = subject({ iconOnly: true });

      fireEvent.click(getByText('Parent Icon'));

      expect(queryByText('First child')).toBeNull();
    });
  });
});
