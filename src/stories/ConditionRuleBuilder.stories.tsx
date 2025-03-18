import type { Meta, StoryObj } from '@storybook/react';
import { ConditionRuleBuilder } from '../components/conditions/condition-rule-builder';

const meta = {
  component: ConditionRuleBuilder,
  args: {
    mode: 'boolean'
  }
} satisfies Meta<typeof ConditionRuleBuilder>;

export default meta;

type Story = StoryObj<typeof ConditionRuleBuilder>;

export const BooleanMode: Story = {
  args: {
    mode: 'boolean'
  }
};

export const DecisionMode: Story = {
  args: {
    mode: 'decision',
    initialRule: {
      conditions: [
        {
          all: [
            {
              field: 'user.profile.age',
              operator: '>',
              value: 18
            },
            {
              field: 'user.profile.country',
              operator: 'in',
              value: ['US', 'GB', 'CA']
            }
          ],
          result: 1
        }
      ],
      default: 0
    }
  }
};
