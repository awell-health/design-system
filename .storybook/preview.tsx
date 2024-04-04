import React from 'react';
import '../tailwind.css';

import { Preview } from '@storybook/react';

const preview: Preview = {
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
};

export default preview;