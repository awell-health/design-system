import '@gorules/jdm-editor/dist/style.css';
import { DecisionGraph, DecisionGraphType, GraphSimulator, JdmConfigProvider, } from '@gorules/jdm-editor';
import { Icon } from '../icon';

export interface DecisionGraphEditorProps {
  decision: DecisionGraphType
  onChange: (decision: DecisionGraphType) => void
  simulator?: {
    enabled: true,
    onRun: (input: unknown, decision: DecisionGraphType) => Promise<unknown>
  }
}

export function DecisionGraphEditor(props: DecisionGraphEditorProps) {
  const { decision, onChange, simulator } = props
  const simulatorPanel = {
    id: 'simulator',
    title: 'Simulator',
    icon: <Icon icon='RiPlayFill' />,
    renderPanel: () => (
      <GraphSimulator
        defaultRequest={JSON.stringify(
          {
            patient: {
              age: 20,
            }
          },
          null,
          2,
        )}
      onRun={(input) => {
        simulator?.onRun(input, decision)
      }}
      />
    ),
  };
  const panels = simulator ? [simulatorPanel] : []
  return (
    <JdmConfigProvider>
      <DecisionGraph
        value={decision}
        onChange={onChange}
        panels={panels}
      />
    </JdmConfigProvider>
  )
}