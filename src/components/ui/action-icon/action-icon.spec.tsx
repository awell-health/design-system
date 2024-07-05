import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';

import { ActionIcon, ActionType } from './action-icon';

describe('ActionIcon', () => {
  it('match snapshot', () => {
    const result = render(<ActionIcon />);

    expect(result).toMatchSnapshot();
  });

  it('renders plugin icon with url', () => {
    const iconUrl = 'ICON_URL';
    const { getByRole } = render(<ActionIcon actionType={ActionType.Plugin} icon_url={iconUrl} />);
    const img = getByRole('img');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', iconUrl);
  });
});
