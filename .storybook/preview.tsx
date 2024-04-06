import React from 'react';
import '../style.css';

import { Preview } from '@storybook/react';

const preview: Preview = {
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
};

export default preview;