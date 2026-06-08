import { render } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { SelectItem } from './types';
import { Select } from './select';

describe('Select', () => {
  const options: SelectItem[] = [
    { label: 'Test 1', value: '1' },
    { label: 'Test 2', value: '2' }
  ];

  const onChange = vi.fn();

  it('match snapshot', () => {
    const { container } = render(<Select options={options} onChange={onChange} />);

    expect(container).toMatchSnapshot();
  });

  it('match multi snapshot', () => {
    const { container } = render(<Select options={options} onChange={onChange} />);

    expect(container).toMatchSnapshot();
  });

  it('should not render if onChange and handleChange are not provided', () => {
    const { container } = render(<Select options={options} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('uses darker disabled colors for selected values', () => {
    const { container, getByText } = render(
      <Select options={options} onChange={onChange} disabled value={options[0]} />
    );

    expect(container.querySelector('[class*="!bg-slate-100"]')).toBeInTheDocument();
    expect(getByText('Test 1')).toHaveClass('!text-slate-500');
  });

  it('uses darker disabled colors for multi-select chips', () => {
    const { getByText } = render(
      <Select options={options} onChange={onChange} disabled isMulti value={options} />
    );

    expect(getByText('Test 1')).toHaveClass('!text-slate-500');
    expect(getByText('Test 2')).toHaveClass('!text-slate-500');
  });
});
