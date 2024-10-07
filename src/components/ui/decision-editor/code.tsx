import { CodeEditor, JdmConfigProvider } from '@gorules/jdm-editor';
import '@gorules/jdm-editor/dist/style.css';

export interface DecisionCodeEditorProps {
  decision: string
  onChange: (decision: string) => void
}

export function DecisionCodeEditor(props: DecisionCodeEditorProps) {
  const { decision, onChange } = props
  return (
    <JdmConfigProvider>
      <CodeEditor
        value={decision}
        onChange={onChange}
      />
    </JdmConfigProvider>
  )
}