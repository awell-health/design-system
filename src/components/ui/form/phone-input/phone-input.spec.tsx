import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { PhoneInput } from './phone-input';

describe('PhoneInput', () => {
  const subject = (props = {}) => {
    const defaultProps = {
      label: 'Phone number',
      helpText: 'Help text',
      onChange: vi.fn()
    };

    return render(<PhoneInput {...defaultProps} {...props} />);
  };

  it('matches snapshot', () => {
    expect(subject({ showFlags: true }).container).toMatchSnapshot();
  });

  it('displays error', () => {
    const { container } = subject({ hasError: true, value: '+14155552671' });
    const input = container.querySelector('input[type="tel"]');

    expect(input).toHaveClass('border-red-500');
  });

  it('calls onChange with phone metadata', () => {
    const onChange = vi.fn();
    const { container } = subject({ onChange });
    const input = container.querySelector('input[type="tel"]');

    fireEvent.change(input as HTMLInputElement, { target: { value: '+14155552671' } });

    expect(onChange).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        country: expect.objectContaining({ iso2: 'us' }),
        inputValue: expect.any(String)
      })
    );
  });

  it('renders a searchable country selector when showFlags is true', () => {
    subject({ showFlags: true });

    fireEvent.click(screen.getByRole('button', { name: 'Select country' }));
    fireEvent.change(screen.getByRole('searchbox', { name: 'Search countries' }), {
      target: { value: 'Ireland' }
    });

    expect(screen.getByText('Ireland')).toBeInTheDocument();
  });

  it('restricts the country selector to available countries', () => {
    subject({ showFlags: true, availableCountries: ['us', 'gb', 'ie'] });

    fireEvent.click(screen.getByRole('button', { name: 'Select country' }));

    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('United Kingdom')).toBeInTheDocument();
    expect(screen.getByText('Ireland')).toBeInTheDocument();
    expect(screen.queryByText('France')).not.toBeInTheDocument();
  });

  it('does not call onChange before user interaction', () => {
    const onChange = vi.fn();
    subject({ onChange, showFlags: true });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('starts with an empty input value', () => {
    const { container } = subject({ showFlags: true });
    const input = container.querySelector('input[type="tel"]') as HTMLInputElement;

    expect(input.value).toBe('');
  });

  it('uses darker disabled colors', () => {
    const { container } = subject({ disabled: true, value: '+14155552671', showFlags: true });
    const input = container.querySelector('input[type="tel"]');
    const countrySelector = screen.getByRole('button', { name: 'Select country' });

    expect(input).toHaveClass('disabled:bg-slate-100', 'disabled:text-slate-500');
    expect(countrySelector).toHaveClass('disabled:bg-slate-100', 'disabled:text-slate-500');
  });
});
