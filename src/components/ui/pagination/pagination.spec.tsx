import { fireEvent, render } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import { Pagination } from './pagination';

describe('Pagination', () => {
  const activePageClass = 'text-blue-700';
  const subject = (props = {}) => {
    const defaultProps = {
      totalCount: 146,
      onPageChange: vi.fn()
    };

    return render(<Pagination {...defaultProps} {...props} />);
  };

  it('match snapshot', () => {
    const { container } = subject();
    expect(container).toMatchSnapshot();
  });

  describe('when click next/prev button', () => {
    it('increase page number', () => {
      const onPageChangeMock = vi.fn();
      const { getByText } = subject({ onPageChange: onPageChangeMock });

      expect(getByText('1')).toHaveClass(activePageClass);

      fireEvent.click(getByText('Next'));

      expect(getByText('1')).not.toHaveClass(activePageClass);
      expect(getByText('2')).toHaveClass(activePageClass);
      expect(onPageChangeMock).toHaveBeenCalledOnce();
    });

    it('decrease page number', () => {
      const onPageChangeMock = vi.fn();
      const { getByText } = subject({ onPageChange: onPageChangeMock });

      expect(getByText('13')).not.toHaveClass(activePageClass);

      fireEvent.click(getByText('13'));
      fireEvent.click(getByText('Previous'));

      expect(getByText('13')).not.toHaveClass(activePageClass);
      expect(getByText('12')).toHaveClass(activePageClass);
      expect(onPageChangeMock).toHaveBeenCalledTimes(2);
    });
  });

  describe('when page changes', () => {
    it('active current page', () => {
      const onPageChangeMock = vi.fn();
      const { getByText } = subject({ onPageChange: onPageChangeMock });

      fireEvent.click(getByText('2'));

      expect(getByText('Previous')).not.toHaveAttribute('disbled');
      expect(getByText('2')).toHaveClass(activePageClass);
    });

    it('shows next page & start pages', () => {
      const { getByText } = subject();

      fireEvent.click(getByText('3'));

      expect(getByText('1')).toBeVisible();
      expect(getByText('2')).toBeVisible();
      expect(getByText('4')).toBeVisible();
    });

    it('shows prev/next pages and prefix divider', () => {
      const { getByText, getAllByText } = subject();

      fireEvent.click(getByText('3'));
      fireEvent.click(getByText('4'));

      expect(getByText('1')).toBeVisible();
      expect(getByText('2')).toBeVisible();
      expect(getByText('3')).toBeVisible();

      fireEvent.click(getByText('5'));

      expect(getByText('4')).toBeVisible();
      expect(getByText('5')).toBeVisible();

      fireEvent.click(getByText('6'));

      expect(getAllByText('...').length).toEqual(2);
    });

    it('shows prev/next pages and suffix divider', () => {
      const { getByText, getAllByText } = subject();

      fireEvent.click(getByText('13'));

      expect(getByText('12')).toBeVisible();
      expect(getByText('14')).toBeVisible();
      expect(getByText('15')).toBeVisible();

      fireEvent.click(getByText('12'));
      fireEvent.click(getByText('11'));

      expect(getByText('10')).toBeVisible();
      expect(getByText('12')).toBeVisible();

      fireEvent.click(getByText('10'));

      expect(getAllByText('...').length).toEqual(2);
    });
  });
});
