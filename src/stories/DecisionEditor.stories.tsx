import { DecisionCodeEditor, DecisionExpressionEditor, DecisionGraphEditor, DecisionTableEditor } from '@/components/ui/decision-editor';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
  component: DecisionGraphEditor
} satisfies Meta<typeof DecisionGraphEditor>;

export default meta;


type CodeStory = StoryObj<typeof DecisionCodeEditor>;

export const Code = {
  args: {
    decision: '',
    onChange: fn(),
  },
  render: (args) => <DecisionCodeEditor {...args} />
} satisfies CodeStory;

type ExpressionStory = StoryObj<typeof DecisionExpressionEditor>;

export const Expression = {
  args: {
    decision: [],
    onChange: fn(),
    inputData: { patient: { firstName: 'Ada', lastName: 'Lovelace', age: 65 } }
  },
  render: (args) => <DecisionExpressionEditor {...args} />
} satisfies ExpressionStory;


type TableStory = StoryObj<typeof DecisionTableEditor>;

export const Table = {
  args: {
    decision: { inputs: [], outputs: [], hitPolicy: 'First', rules: [] },
    onChange: fn(),
    inputData: { patient: { firstName: 'Ada', lastName: 'Lovelace', age: 65 } }
  },
  render: (args) => <DecisionTableEditor {...args} />
} satisfies TableStory;

type GraphStory = StoryObj<typeof DecisionGraphEditor>;

export const Graph = {
  args: {
    decision: { nodes: [], edges: [] },
    simulator: {
      enabled: true,
      onRun: fn()
    },
    onChange: fn()
  },
  render: (args) => <DecisionGraphEditor {...args} />
} satisfies GraphStory;

