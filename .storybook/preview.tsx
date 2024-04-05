import React from 'react';
import '../styles.css';

import { Preview } from '@storybook/react';

const preview: Preview = {
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
};

export default preview;