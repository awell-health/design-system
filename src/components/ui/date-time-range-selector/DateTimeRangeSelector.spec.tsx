import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { DateTimeRangeSelector } from './DateTimeRangeSelector';
import { DateInput } from './DateInput';
import { TimeInput } from './TimeInput';
import { DateTimeInput } from './DateTimeInput';

describe('DateTimeRangeSelector', () => {
  it('should render with default placeholder', () => {
    render(<DateTimeRangeSelector onUpdate={() => {}} />);

    const input = screen.getByTestId('date-time-range-selector-trigger');
    expect(input).toHaveValue('Select date range');
  });

  it('should render with custom placeholder', () => {
    render(<DateTimeRangeSelector onUpdate={() => {}} placeholder='Choose dates' />);

    const input = screen.getByTestId('date-time-range-selector-trigger');
    expect(input).toHaveValue('Choose dates');
  });

  it('should render with initial dates', () => {
    render(
      <DateTimeRangeSelector
        onUpdate={() => {}}
        initialDateFrom='2026-01-10T09:00:00.000Z'
        initialDateTo='2026-01-15T17:00:00.000Z'
      />
    );

    const input = screen.getByTestId('date-time-range-selector-trigger');
    expect(input.getAttribute('value')).toContain('January');
  });

  it('should open popover when clicking the input', () => {
    render(<DateTimeRangeSelector onUpdate={() => {}} />);

    const input = screen.getByTestId('date-time-range-selector-trigger');
    fireEvent.click(input);

    const popover = screen.getByTestId('date-time-range-selector-popover');
    expect(popover).toHaveClass('opacity-100');
  });

  it('should close popover when clicking cancel', () => {
    render(<DateTimeRangeSelector onUpdate={() => {}} />);

    const input = screen.getByTestId('date-time-range-selector-trigger');
    fireEvent.click(input);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    const popover = screen.getByTestId('date-time-range-selector-popover');
    expect(popover).toHaveClass('opacity-0');
  });

  it('should call onUpdate when applying changes', () => {
    const handleUpdate = vi.fn();
    // Use dates that are different from any preset
    const oldDate = new Date(2020, 0, 1);
    render(
      <DateTimeRangeSelector
        onUpdate={handleUpdate}
        initialDateFrom={oldDate}
        initialDateTo={oldDate}
      />
    );

    // Open popover
    const input = screen.getByTestId('date-time-range-selector-trigger');
    fireEvent.click(input);

    // Click a preset button (this will change the range significantly)
    const last7DaysButton = screen.getByRole('button', { name: /last 7 days/i });
    fireEvent.click(last7DaysButton);

    // Apply changes
    const applyButton = screen.getByRole('button', { name: /apply/i });
    fireEvent.click(applyButton);

    expect(handleUpdate).toHaveBeenCalledWith({
      range: expect.objectContaining({
        from: expect.any(Date),
        to: expect.any(Date)
      })
    });
  });

  it('should show presets by default', () => {
    render(<DateTimeRangeSelector onUpdate={() => {}} />);

    const input = screen.getByTestId('date-time-range-selector-trigger');
    fireEvent.click(input);

    expect(screen.getByText('Presets')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /last 7 days/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /last 30 days/i })).toBeInTheDocument();
  });

  it('should hide presets when showPresets is false', () => {
    render(<DateTimeRangeSelector onUpdate={() => {}} showPresets={false} />);

    const input = screen.getByTestId('date-time-range-selector-trigger');
    fireEvent.click(input);

    expect(screen.queryByText('Presets')).not.toBeInTheDocument();
  });

  it('should render as disabled', () => {
    render(<DateTimeRangeSelector onUpdate={() => {}} disabled />);

    const input = screen.getByTestId('date-time-range-selector-trigger');
    expect(input).toBeDisabled();
  });

  it('should not open popover when disabled', () => {
    render(<DateTimeRangeSelector onUpdate={() => {}} disabled />);

    const input = screen.getByTestId('date-time-range-selector-trigger');
    fireEvent.click(input);

    const popover = screen.getByTestId('date-time-range-selector-popover');
    expect(popover).toHaveClass('opacity-0');
  });

  it('should use custom presets', () => {
    const customPresets = [
      { name: 'last7', label: 'Custom Week' },
      { name: 'last30', label: 'Custom Month' }
    ];

    render(<DateTimeRangeSelector onUpdate={() => {}} presets={customPresets} />);

    const input = screen.getByTestId('date-time-range-selector-trigger');
    fireEvent.click(input);

    expect(screen.getByRole('button', { name: /custom week/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /custom month/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /this month/i })).not.toBeInTheDocument();
  });
});

describe('DateInput', () => {
  it('should render with provided value', () => {
    const handleChange = vi.fn();
    const testDate = new Date(2025, 5, 15, 10, 0, 0); // June 15, 2025 10:00 AM local time
    render(<DateInput value={testDate} onChange={handleChange} />);

    expect(screen.getByLabelText('Month')).toHaveValue('6'); // month
    expect(screen.getByLabelText('Day')).toHaveValue('15'); // day
    expect(screen.getByLabelText('Year')).toHaveValue('2025'); // year
  });

  it('should call onChange when typing valid date', () => {
    const handleChange = vi.fn();
    const testDate = new Date(2025, 0, 1);
    render(<DateInput value={testDate} onChange={handleChange} />);

    const monthInput = screen.getByLabelText('Month');
    fireEvent.change(monthInput, { target: { value: '3' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    const handleChange = vi.fn();
    render(<DateInput onChange={handleChange} disabled />);

    const monthInput = screen.getByLabelText('Month');
    expect(monthInput).toBeDisabled();
  });

  it('should render placeholder text when empty', () => {
    const handleChange = vi.fn();
    render(<DateInput onChange={handleChange} />);

    const monthInput = screen.getByLabelText('Month');
    expect(monthInput).toHaveAttribute('placeholder', 'M');

    const dayInput = screen.getByLabelText('Day');
    expect(dayInput).toHaveAttribute('placeholder', 'D');

    const yearInput = screen.getByLabelText('Year');
    expect(yearInput).toHaveAttribute('placeholder', 'YYYY');
  });
});

describe('TimeInput', () => {
  it('should render with provided value in 12-hour format', () => {
    const handleChange = vi.fn();
    // 2:30 PM local time
    const testDate = new Date(2026, 0, 16, 14, 30, 0);
    render(<TimeInput value={testDate} onChange={handleChange} />);

    expect(screen.getByLabelText('Hours')).toHaveValue('02');
    expect(screen.getByLabelText('Minutes')).toHaveValue('30');
    expect(screen.getByLabelText('Toggle AM/PM')).toHaveTextContent('PM');
  });

  it('should render AM time correctly', () => {
    const handleChange = vi.fn();
    // 9:15 AM local time
    const testDate = new Date(2026, 0, 16, 9, 15, 0);
    render(<TimeInput value={testDate} onChange={handleChange} />);

    expect(screen.getByLabelText('Hours')).toHaveValue('09');
    expect(screen.getByLabelText('Minutes')).toHaveValue('15');
    expect(screen.getByLabelText('Toggle AM/PM')).toHaveTextContent('AM');
  });

  it('should toggle AM/PM when clicking the toggle', () => {
    const handleChange = vi.fn();
    const testDate = new Date(2026, 0, 16, 9, 15, 0);
    render(<TimeInput value={testDate} onChange={handleChange} />);

    const ampmButton = screen.getByLabelText('Toggle AM/PM');
    fireEvent.click(ampmButton);

    expect(screen.getByLabelText('Toggle AM/PM')).toHaveTextContent('PM');
    expect(handleChange).toHaveBeenCalled();
  });

  it('should increment hours when clicking up arrow', () => {
    const handleChange = vi.fn();
    const testDate = new Date(2026, 0, 16, 9, 15, 0);
    render(<TimeInput value={testDate} onChange={handleChange} />);

    const incrementButton = screen.getByLabelText('Increment hours');
    fireEvent.click(incrementButton);

    expect(handleChange).toHaveBeenCalled();
  });

  it('should decrement hours when clicking down arrow', () => {
    const handleChange = vi.fn();
    const testDate = new Date(2026, 0, 16, 9, 15, 0);
    render(<TimeInput value={testDate} onChange={handleChange} />);

    const decrementButton = screen.getByLabelText('Decrement hours');
    fireEvent.click(decrementButton);

    expect(handleChange).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    const handleChange = vi.fn();
    render(<TimeInput onChange={handleChange} disabled />);

    const hoursInput = screen.getByLabelText('Hours');
    expect(hoursInput).toBeDisabled();
  });

  it('should wrap hours from 12 to 1 when incrementing', () => {
    const handleChange = vi.fn();
    const testDate = new Date(2026, 0, 16, 12, 0, 0); // 12 PM
    render(<TimeInput value={testDate} onChange={handleChange} />);

    const incrementButton = screen.getByLabelText('Increment hours');
    fireEvent.click(incrementButton);

    // After incrementing from 12, should be 1
    expect(handleChange).toHaveBeenCalled();
    const newDate = handleChange.mock.calls[0][0] as Date;
    expect(newDate.getHours()).toBe(13); // 1 PM in 24-hour format
  });
});

describe('DateTimeInput', () => {
  it('should render with label', () => {
    const handleChange = vi.fn();
    render(<DateTimeInput onChange={handleChange} label='Start Date' />);

    expect(screen.getByText('Start Date')).toBeInTheDocument();
  });

  it('should render both date and time inputs', () => {
    const handleChange = vi.fn();
    render(<DateTimeInput onChange={handleChange} />);

    // Date inputs
    expect(screen.getByLabelText('Month')).toBeInTheDocument();
    expect(screen.getByLabelText('Day')).toBeInTheDocument();
    expect(screen.getByLabelText('Year')).toBeInTheDocument();

    // Time inputs
    expect(screen.getByLabelText('Hours')).toBeInTheDocument();
    expect(screen.getByLabelText('Minutes')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle AM/PM')).toBeInTheDocument();
  });

  it('should preserve time when changing date', () => {
    const handleChange = vi.fn();
    const testDate = new Date(2026, 0, 16, 14, 30, 0);
    render(<DateTimeInput value={testDate} onChange={handleChange} />);

    const dayInput = screen.getByLabelText('Day');
    fireEvent.change(dayInput, { target: { value: '20' } });

    expect(handleChange).toHaveBeenCalled();
    const calledDate = handleChange.mock.calls[0][0] as Date;
    expect(calledDate.getHours()).toBe(14);
    expect(calledDate.getMinutes()).toBe(30);
  });

  it('should preserve date when changing time', () => {
    const handleChange = vi.fn();
    const testDate = new Date(2026, 0, 16, 14, 30, 0);
    render(<DateTimeInput value={testDate} onChange={handleChange} />);

    const ampmButton = screen.getByLabelText('Toggle AM/PM');
    fireEvent.click(ampmButton);

    expect(handleChange).toHaveBeenCalled();
    const calledDate = handleChange.mock.calls[0][0] as Date;
    expect(calledDate.getDate()).toBe(16);
    expect(calledDate.getMonth()).toBe(0); // January
  });
});
