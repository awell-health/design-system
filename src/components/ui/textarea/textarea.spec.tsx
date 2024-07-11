import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import { Textarea } from './textarea';

describe('Textarea', () => {
  const subject = (props = {}) => {
    const defaultProps = {
      helpText: 'Helper text',
      label: 'Textarea Label',
      placeholder: 'Type your text here',
      hasError: false
    };

    return render(<Textarea {...defaultProps} {...props} data-testid='textarea' />);
  };
  it('match snapshot', () => {
    expect(subject().container).toMatchSnapshot();
  });

  it('shows error state', () => {
    const { getByTestId, getByText } = subject({ hasError: true });

    expect(getByTestId('textarea')).toHaveClass('border-red-300');
    expect(getByText('Helper text')).toHaveClass('text-red-500');
  });
});
