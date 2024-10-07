import { DecisionTable, DecisionTableType, JdmConfigProvider } from '@gorules/jdm-editor';
import '@gorules/jdm-editor/dist/style.css';

export interface DecisionTableEditorProps {
  decision: DecisionTableType
  onChange: (decision: DecisionTableType) => void
  inputData: unknown
  tableHeight?: number
}

export function DecisionTableEditor(props: DecisionTableEditorProps) {
  const { decision, onChange, inputData, tableHeight = 500 } = props
  return (
    <JdmConfigProvider>
      <DecisionTable
        value={decision}
        onChange={onChange}
        tableHeight={tableHeight}
        inputData={inputData}
      />
    </JdmConfigProvider>
  )
}