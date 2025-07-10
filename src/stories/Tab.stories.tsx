import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Tab, TabItem } from '../components';

const meta = {
  component: Tab,
  parameters: {
    docs: {
      description: {
        component:
          'Enhanced Tab component with support for both click handlers and link navigation. Supports right-click context menu, Ctrl+click, and middle-click for "open in new tab" functionality.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered']
    },
    size: {
      control: 'select',
      options: ['sm', 'md']
    },
    fullWidth: {
      control: 'boolean'
    },
    preserveClientSideNavigation: {
      control: 'boolean'
    }
  }
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof Tab>;

// Original behavior - onClick only (backward compatibility)
const clickOnlyItems: TabItem[] = [
  { id: '1', label: 'First', onClick: fn() },
  { id: '2', label: 'Second', onClick: fn() },
  { id: '3', label: 'Third', onClick: fn() }
];

export const ClickOnly = {
  args: {
    items: clickOnlyItems,
    size: 'md',
    variant: 'default',
    selected: '1',
    fullWidth: true
  },
  render: (args) => <Tab {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Traditional tab behavior with onClick handlers only. Maintains backward compatibility.'
      }
    }
  }
} satisfies Story;

// New behavior - href links for "open in new tab" support
const linkItems: TabItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'contact', label: 'Contact', href: '/contact' }
];

export const LinkBased = {
  args: {
    items: linkItems,
    size: 'md',
    variant: 'default',
    selected: 'home',
    fullWidth: true
  },
  render: (args) => <Tab {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Tab items rendered as links with href attributes. Supports right-click context menu, Ctrl+click, and middle-click for opening in new tabs.'
      }
    }
  }
} satisfies Story;

// Hybrid navigation - both href and onClick
const hybridItems: TabItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    onClick: fn()
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/analytics',
    onClick: fn()
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    onClick: fn()
  }
];

export const HybridNavigation = {
  args: {
    items: hybridItems,
    size: 'md',
    variant: 'default',
    selected: 'dashboard',
    fullWidth: true,
    preserveClientSideNavigation: true
  },
  render: (args) => <Tab {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Hybrid navigation with both href and onClick. Normal click triggers onClick (client-side navigation), while right-click, Ctrl+click, and middle-click use href (new tab).'
      }
    }
  }
} satisfies Story;

// External links with target="_blank"
const externalItems: TabItem[] = [
  { id: 'docs', label: 'Documentation', href: '/docs' },
  { id: 'github', label: 'GitHub', href: 'https://github.com', target: '_blank' },
  { id: 'support', label: 'Support', href: 'https://support.example.com', target: '_blank' }
];

export const ExternalLinks = {
  args: {
    items: externalItems,
    size: 'md',
    variant: 'default',
    selected: 'docs',
    fullWidth: true
  },
  render: (args) => <Tab {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Tab items with external links using target="_blank" to open in new tabs by default.'
      }
    }
  }
} satisfies Story;

// Disabled states
const disabledItems: TabItem[] = [
  { id: 'enabled', label: 'Enabled', onClick: fn() },
  { id: 'disabled-click', label: 'Disabled (Click)', onClick: fn(), disabled: true },
  { id: 'disabled-link', label: 'Disabled (Link)', href: '/disabled', disabled: true },
  { id: 'enabled-link', label: 'Enabled (Link)', href: '/enabled' }
];

export const DisabledStates = {
  args: {
    items: disabledItems,
    size: 'md',
    variant: 'default',
    selected: 'enabled',
    fullWidth: true
  },
  render: (args) => <Tab {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates disabled state support for both click and link-based tabs.'
      }
    }
  }
} satisfies Story;

// Mixed item types
const mixedItems: TabItem[] = [
  { id: 'button', label: 'Button Tab', onClick: fn() },
  { id: 'link', label: 'Link Tab', href: '/link' },
  {
    id: 'hybrid',
    label: 'Hybrid Tab',
    href: '/hybrid',
    onClick: fn()
  },
  {
    id: 'external',
    label: 'External',
    href: 'https://example.com',
    target: '_blank'
  },
  { id: 'disabled', label: 'Disabled', onClick: fn(), disabled: true }
];

export const MixedTypes = {
  args: {
    items: mixedItems,
    size: 'md',
    variant: 'default',
    selected: 'button',
    fullWidth: true
  },
  render: (args) => <Tab {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Mix of different tab types: button-only, link-only, hybrid, external, and disabled tabs all in one component.'
      }
    }
  }
} satisfies Story;

// Bordered variant with new features
const borderedItems: TabItem[] = [
  { id: 'overview', label: 'Overview', href: '/overview' },
  { id: 'details', label: 'Details', href: '/details' },
  { id: 'external', label: 'External', href: 'https://example.com', target: '_blank' }
];

export const BorderedVariant = {
  args: {
    items: borderedItems,
    size: 'md',
    variant: 'bordered',
    selected: 'overview',
    fullWidth: true,
  },
  render: (args) => <Tab {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Bordered variant with link-based navigation support.'
      }
    }
  }
} satisfies Story;

// Custom LinkComponent simulation (for documentation)
const CustomLink = ({ href, children, ...props }: any) => (
  <a href={href} {...props} style={{ textDecoration: 'underline' }}>
    {children}
  </a>
);

const customLinkItems: TabItem[] = [
  { id: 'custom1', label: 'Custom Link 1', href: '/custom1' },
  { id: 'custom2', label: 'Custom Link 2', href: '/custom2' },
  { id: 'custom3', label: 'Custom Link 3', href: '/custom3' }
];

export const CustomLinkComponent = {
  args: {
    items: customLinkItems,
    size: 'md',
    variant: 'default',
    selected: 'custom1',
    fullWidth: true,
    linkComponent: CustomLink
  },
  render: (args) => <Tab {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Using a custom LinkComponent (e.g., React Router Link, Next.js Link) for client-side routing integration.'
      }
    }
  }
} satisfies Story;

// Size variants
export const SmallSize = {
  args: {
    items: hybridItems,
    size: 'sm',
    variant: 'default',
    selected: 'dashboard',
    fullWidth: true
  },
  render: (args) => <Tab {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Small size variant with hybrid navigation.'
      }
    }
  }
} satisfies Story;

// Legacy example (renamed from Example)
export const Example = {
  args: {
    items: clickOnlyItems,
    size: 'md',
    variant: 'default',
    selected: '1',
    fullWidth: true
  },
  render: (args) => <Tab {...args} />
} satisfies Story;
