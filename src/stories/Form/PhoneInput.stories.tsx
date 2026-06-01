import { PhoneInput } from '@/components/ui/form/phone-input';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: PhoneInput
} satisfies Meta<typeof PhoneInput>;

export default meta;

type Story = StoryObj<typeof PhoneInput>;

export const Default = {
  args: {
    placeholder: 'Enter phone number',
    label: 'Phone number',
    helpText: 'A standard phone input without country flags',
    disabled: false,
    hasError: false
  },
  render: (args) => <PhoneInput {...args} />
} satisfies Story;

export const WithFlags = {
  args: {
    placeholder: 'Enter phone number',
    label: 'Phone number',
    helpText: 'Select a country and enter a phone number',
    disabled: false,
    hasError: false,
    showFlags: true,
    defaultCountry: 'us'
  },
  render: (args) => <PhoneInput {...args} />
} satisfies Story;

export const WithRestrictedCountries = {
  args: {
    placeholder: 'Enter phone number',
    label: 'Phone number',
    helpText: 'Country selection is restricted to US, GB, and IE',
    disabled: false,
    hasError: false,
    showFlags: true,
    defaultCountry: 'gb',
    availableCountries: ['us', 'gb', 'ie']
  },
  render: (args) => <PhoneInput {...args} />
} satisfies Story;

export const WithAllSettings = {
  args: {
    label: 'Phone number',
    sublabel: 'UK default with restricted countries',
    helpText: 'Only UK, Belgium, and US are available',
    placeholder: 'Enter phone number',
    defaultCountry: 'gb',
    showFlags: true,
    availableCountries: ['gb', 'be', 'us'],
    preferredCountries: ['gb'],
    required: true,
    disabled: false,
    hasError: false
  },
  render: (args) => <PhoneInput {...args} />
} satisfies Story;
