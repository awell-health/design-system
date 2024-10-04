import { Expression, ExpressionProps, JdmConfigProvider } from '@gorules/jdm-editor';
import '@gorules/jdm-editor/dist/style.css';

type ExpressionType = ExpressionProps['value']

export interface DecisionExpressionEditorProps {
  decision: ExpressionType
  onChange: (decision: ExpressionType) => void
  inputData: unknown
}

export function DecisionExpressionEditor(props: DecisionExpressionEditorProps) {
  const { decision, onChange, inputData } = props
  return (
    <JdmConfigProvider>
      <Expression
        value={decision}
        onChange={onChange}
        inputData={inputData}
      />
    </JdmConfigProvider>
  )
}