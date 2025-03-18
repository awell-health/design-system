import type { Meta, StoryObj } from '@storybook/react';
import { ConditionRuleBuilder } from '../components/conditions/condition-rule-builder';
import { Rule } from '../components/conditions/types';

const meta = {
  component: ConditionRuleBuilder,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof ConditionRuleBuilder>;

export default meta;

type Story = StoryObj<typeof ConditionRuleBuilder>;

// Add a common onChange handler for all stories
const handleChange = (rule: Rule) => {
  console.log('Rule changed:', rule);
};

const appointmentPayload = {
  id: 67176890458,
  scheduled_date: '2016-10-13T11:15:00Z',
  duration: 15,
  time_slot_type: 'appointment',
  time_slot_status: null,
  reason: 'Follow-Up',
  description: 'follow up to procedure',
  status: {
    status: 'Not Seen',
    room: 'Room 102',
    status_date: '2016-10-13T01:02:37',
    status_detail: 'No Show'
  },
  service_location: {
    id: 13631735,
    name: 'Elation North',
    place_of_service: 1,
    address_line1: '1234 First Practice Way',
    address_line2: '',
    city: 'San Francisco',
    state: 'CA',
    zip: '94114',
    phone: '555-555-5555'
  },
  telehealth_details: 'video platform',
  patient: 64058687489,
  physician: 131074,
  practice: 65540,
  recurring_event_schedule: null,
  billing_details: {
    billing_note: '',
    referring_provider: '',
    referring_provider_state: 'CA'
  },
  payment: {
    id: 140755836010857,
    amount: '20.00',
    when_collected: '2020-01-27T16:17:43Z',
    bill: null,
    appointment: 67176890458,
    create_date: '2020-01-27T16:17:43Z',
    delete_date: null
  },
  metadata: null,
  created_date: '2016-10-13T00:47:01Z',
  last_modified_date: '2016-10-13T00:59:16Z',
  deleted_date: null,
  mode: 'IN_PERSON',
  instructions: 'Please arrive 5 minutes early'
};

const StoryWrapper = (args: any) => (
  <div className="flex gap-8 items-start max-w-[1200px]">
    <div className="flex-1">
      <ConditionRuleBuilder {...args} />
    </div>
    <div className="flex-1">
      <div className="p-4 bg-slate-50 rounded-lg">
        <h3 className="text-sm font-medium mb-2 text-slate-700">Available Payload:</h3>
        <pre className="text-xs whitespace-pre-wrap overflow-auto max-h-[600px]">
          {JSON.stringify(appointmentPayload, null, 2)}
        </pre>
      </div>
    </div>
  </div>
);

export const BooleanMode: Story = {
  args: {
    mode: 'boolean',
    payload: appointmentPayload,
    onChange: handleChange,
    initialRule: {
      all: [
        {
          field: 'duration',
          operator: '>=',
          value: 15
        },
        {
          any: [
            {
              field: 'mode',
              operator: '==',
              value: 'IN_PERSON'
            },
            {
              field: 'status.status',
              operator: '!=',
              value: 'Not Seen'
            }
          ]
        }
      ]
    }
  },
  render: StoryWrapper
};

export const DecisionMode: Story = {
  args: {
    mode: 'decision',
    payload: appointmentPayload,
    onChange: handleChange,
    initialRule: {
      conditions: [
        {
          all: [
            {
              field: 'service_location.state',
              operator: 'in',
              value: ['CA', 'NY', 'TX']
            },
            {
              field: 'mode',
              operator: '==',
              value: 'VIDEO'
            }
          ],
          result: 1
        },
        {
          all: [
            {
              field: 'payment.amount',
              operator: '>',
              value: '0'
            },
            {
              field: 'status.status',
              operator: '==',
              value: 'Not Seen'
            }
          ],
          result: 0
        }
      ],
      default: 0
    }
  },
  render: StoryWrapper
};

export const EmptyBoolean: Story = {
  args: {
    mode: 'boolean',
    payload: appointmentPayload,
    onChange: handleChange
  },
  render: StoryWrapper
};

export const EmptyDecision: Story = {
  args: {
    mode: 'decision',
    payload: appointmentPayload,
    onChange: handleChange
  },
  render: StoryWrapper
};
