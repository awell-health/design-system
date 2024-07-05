import { render } from '@testing-library/react';
import { expect, it, describe } from 'vitest';

import { ActionIcon } from './action-icon';
import { ActionType } from './types';

describe('ActionIcon', () => {
  it('match snapshot', () => {
    const { container } = render(<ActionIcon />);

    expect(container).toMatchSnapshot();
  });

  it('renders plugin icon with url', () => {
    const iconUrl = 'ICON_URL';
    const { getByRole } = render(<ActionIcon actionType={ActionType.Plugin} icon_url={iconUrl} />);
    const img = getByRole('img');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', iconUrl);
  });
});
