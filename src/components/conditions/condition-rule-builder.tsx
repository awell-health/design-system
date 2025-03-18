"use client"

import { useState, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"
import { Rule, Condition, Operator, Constraint as RuleConstraint } from "rulepilot"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/form/input"
import { Select } from "@/components/ui/form/select"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tab } from "@/components/ui/tab"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

// First, let's define our core types clearly at the top
type DecisionResult = string | number;

interface SimpleCondition {
  field: string;
  operator: Operator;
  value: RuleConstraint['value'], 
}

interface BooleanCondition {
  all?: SimpleCondition[];
  any?: SimpleCondition[];
  none?: SimpleCondition[];
}

interface DecisionCondition<ResultType extends DecisionResult = DecisionResult> extends BooleanCondition {
  result: ResultType;
}

interface BooleanRule {
  conditions: BooleanCondition;
}

interface DecisionRule {
  conditions: DecisionCondition[];
  default: DecisionResult;
}

// Component props
interface ConditionRowProps {
  condition: SimpleCondition;
  onChange: (condition: SimpleCondition) => void;
  onRemove: () => void;
  paths: string[];
  payload: Record<string, unknown>;
}

interface ConditionGroupProps {
  group: BooleanCondition | DecisionCondition;
  onChange: (group: BooleanCondition | DecisionCondition) => void;
  onRemove: () => void;
  paths: string[];
  payload: Record<string, unknown>;
  level?: number;
  isArrayItemGroup?: boolean;
  mode: 'boolean' | 'decision';
  resultType?: 'string' | 'number';
}

interface ConditionRuleBuilderProps {
  mode: 'boolean' | 'decision';
  resultType?: 'string' | 'number';
  onChange?: (rule: BooleanRule | DecisionRule) => void;
  initialRule?: BooleanRule | DecisionRule;
}

// Helper functions
const isConstraint = (value: BooleanCondition | DecisionCondition): value is BooleanCondition => {
  return ('all' in value || 'any' in value || 'none' in value) && !('result' in value);
};

const isDecisionCondition = (value: BooleanCondition | DecisionCondition): value is DecisionCondition => {
  return ('all' in value || 'any' in value || 'none' in value) && 'result' in value;
};

const getLogicalOperator = (group: BooleanCondition | DecisionCondition): 'all' | 'any' | 'none' => {
  if ('all' in group) return 'all';
  if ('any' in group) return 'any';
  if ('none' in group) return 'none';
  return 'all';
};

// const getConditions = (group: BooleanCondition | DecisionCondition): SimpleCondition[] => {
//   const operator = getLogicalOperator(group);
//   return group[operator] || [];
// };

// Component props types
interface OperatorSelectorProps {
  operators: OperatorOption[]
  selectedOperator: string
  onChange: (value: string) => void
  className?: string
}

interface ValueInputProps {
  type: string
  operator: string
  value: string | string[]
  onChange: (value: string | string[]) => void
  className?: string
}

// interface ConditionProps {
//   condition: Condition
//   onChange: (condition: Condition) => void
//   onRemove: () => void
//   paths: string[]
//   payload: any
// }

interface ConditionGroupProps {
  group: BooleanCondition | DecisionCondition;
  onChange: (group: BooleanCondition | DecisionCondition) => void;
  onRemove: () => void;
  paths: string[];
  payload: Record<string, unknown>;
  level?: number;
  isArrayItemGroup?: boolean;
  mode: 'boolean' | 'decision';
  resultType?: 'string' | 'number';
}

interface OperatorOption {
  value: string
  label: string
}

// Sample webhook payload
const samplePayload = {
  "id": 67176890458,                                      // long(64) read-only 
  "scheduled_date": "2016-10-13T11:15:00Z",               // datetime(iso8601)
  "duration": 15,                                         // integer  (in minutes)
  "time_slot_type": "appointment",
  "time_slot_status": null,
  "reason": "Follow-Up",                                  // string(50), not nullable
  "description": "follow up to procedure",                // string(500)
  "status": {                                             // optional in "Create"
      "status": "Not Seen",                               // required in "Update"
      "room": "Room 102",
      "status_date": "2016-10-13T01:02:37",               // read-only
      "status_detail": "No Show"                          // only available for status "Not Seen"
  },
  "service_location": {
      "id": 13631735,
      "name": "Elation North",
      "place_of_service": 1,                              // int(32)
      "address_line1": "1234 First Practice Way",
      "address_line2": "",
      "city": "San Francisco",
      "state": "CA",
      "zip": "94114",
      "phone": "555-555-5555",
  },
  "telehealth_details": "video platform",                 // string - ***Deprecated 2024-06-11
  "patient": 64058687489,                                 // long(64)
  "physician": 131074,                                    // long(64)
  "practice": 65540,                                      // long(64)
  "recurring_event_schedule": null,
  "billing_details": {                                    // billing information for appointments must be enabled for practice
      "billing_note": "",                                 // string(500)
      "referring_provider": "",                           // string(100)
      "referring_provider_state": "CA"                    // string(2)
  },
  "payment": {
      "id": 140755836010857,                              // long(64) read-only
      "amount": "20.00",
      "when_collected": "2020-01-27T16:17:43Z",
      "bill": null,
      "appointment": 67176890458,
      "create_date": "2020-01-27T16:17:43Z",
      "delete_date": null
  },
  "metadata": null,
  "created_date": "2016-10-13T00:47:01Z",                 // datetime(iso8601)   read-only
  "last_modified_date": "2016-10-13T00:59:16Z",           // datetime(iso8601)   read-only
  "deleted_date": null,                                   // datetime(iso8601)   read-only
  "mode": "IN_PERSON",                                    // IN_PERSON or VIDEO
  "instructions": "Please arrive 5 minutes early"         // string(500)
}

// Operator options based on value type
const allOperatorTypes = {
  EQUALS: { value: "==", label: "equals" },
  NOT_EQUALS: { value: "!=", label: "not equals" },
  GREATER_THAN: { value: ">", label: "greater than" },
  GREATER_THAN_OR_EQUAL: { value: ">=", label: "greater than or equal" },
  LESS_THAN: { value: "<", label: "less than" },
  LESS_THAN_OR_EQUAL: { value: "<=", label: "less than or equal" },
  IN: { value: "in", label: "in list" },
  NOT_IN: { value: "not_in", label: "not in list" },
  IS_EMPTY: { value: "is_empty", label: "is empty" },
  IS_NOT_EMPTY: { value: "is_not_empty", label: "is not empty" },
  CONTAINS: { value: "contains", label: "contains" },
  NOT_CONTAINS: { value: "not_contains", label: "not contains" },
  STARTS_WITH: { value: "starts_with", label: "starts with" },
  ENDS_WITH: { value: "ends_with", label: "ends with" },
  HAS_PROPERTY: { value: "has_property", label: "has property" },
  NOT_HAS_PROPERTY: { value: "not_has_property", label: "not has property" },
  ANY_ITEM: { value: "any_item", label: "any item matches" },
  ALL_ITEMS: { value: "all_items", label: "all items match" },
  NO_ITEMS: { value: "no_items", label: "no items match" },
}

const operatorsByType = {
  string: [
    allOperatorTypes.EQUALS,
    allOperatorTypes.NOT_EQUALS,
    allOperatorTypes.CONTAINS,
    allOperatorTypes.NOT_CONTAINS,
    allOperatorTypes.STARTS_WITH,
    allOperatorTypes.ENDS_WITH,
  ],
  number: [
    allOperatorTypes.EQUALS,
    allOperatorTypes.NOT_EQUALS,
    allOperatorTypes.GREATER_THAN,
    allOperatorTypes.GREATER_THAN_OR_EQUAL,
    allOperatorTypes.LESS_THAN,
    allOperatorTypes.LESS_THAN_OR_EQUAL,
    allOperatorTypes.IN,
    allOperatorTypes.NOT_IN,
  ],
  boolean: [
    allOperatorTypes.EQUALS,
    allOperatorTypes.NOT_EQUALS,
  ],
  array: [
    allOperatorTypes.CONTAINS,
    allOperatorTypes.NOT_CONTAINS,
    allOperatorTypes.IS_EMPTY,
    allOperatorTypes.IS_NOT_EMPTY,
    allOperatorTypes.ANY_ITEM,
    allOperatorTypes.ALL_ITEMS,
    allOperatorTypes.NO_ITEMS,
  ],
  "array-item": [
    allOperatorTypes.EQUALS,
    allOperatorTypes.NOT_EQUALS,
  ],
  object: [
    { value: "has_property", label: "has property" },
    { value: "not_has_property", label: "not has property" },
  ],
}

// Get all possible paths from a JSON object using dot notation
const getPathsFromObject = (obj: Record<string, unknown>, parentPath = "") => {
  let paths: unknown[] = []

  for (const key in obj) {
    const currentPath = parentPath ? `${parentPath}.${key}` : key
    paths.push(currentPath)
    const val = obj[key]
    if (val && typeof val === "object") {
      if (Array.isArray(val)) {
        // For arrays, add a special path for array items
        if (val.length > 0 && typeof val[0] === "object") {
          // If array contains objects, add paths for object properties
          const itemProperties = Object.keys(val[0])
          for (const prop of itemProperties) {
            paths.push(`${currentPath}[].${prop}`)
          }
        }
      } else {
        // For objects, recursively get paths
        paths = [...paths, ...getPathsFromObject(val as Record<string, unknown>, currentPath)]
      }
    }
  }

  return paths
}

// Get value type from a path in the JSON object
const getValueTypeFromPath = (obj: Record<string, unknown>, path: string) => {
  // Handle array item paths
  if (path.includes("[].")) {
    return "array-item"
  }

  const parts = path.split(".")
  let current = obj

  for (const part of parts) {
    if (current === undefined || current === null) return "unknown"
    current = current[part] as Record<string, unknown>
  }

  if (Array.isArray(current)) return "array"
  if (current === null) return "null"
  return typeof current
}

// Get array item property path components
const parseArrayItemPath = (path: string) => {
  const arrayPathMatch = path.match(/(.+)\[\]\.(.+)/)
  if (arrayPathMatch) {
    return {
      arrayPath: arrayPathMatch[1],
      propertyName: arrayPathMatch[2],
    }
  }
  return null
}

// Get value from a path in the JSON object
const getValueFromPath = (obj: Record<string, unknown>, path: string) => {
  // Handle array item paths
  const arrayItemPath = parseArrayItemPath(path)
  if (arrayItemPath) {
    const { arrayPath, propertyName } = arrayItemPath
    const parts = arrayPath.split(".")
    let current = obj

    for (const part of parts) {
      if (current === undefined || current === null) return undefined
      current = current[part] as Record<string, unknown>
    }

    if (Array.isArray(current) && current.length > 0) {
      // Return the first item's property as an example
      return current[0][propertyName]
    }

    return undefined
  }

  // Handle regular paths
  const parts = path.split(".")
  let current = obj

  for (const part of parts) {
    if (current === undefined || current === null) return undefined
    current = current[part] as Record<string, unknown>
  }

  return current
}

// Component for JSON preview with syntax highlighting
const JSONPreview = ({ data }: { data: Record<string, unknown> }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatValue = (value: unknown, indent = 0) => {
    const indentStr = "  ".repeat(indent)

    if (value === null) return <span className="text-gray-500">null</span>

    if (Array.isArray(value)) {
      if (value.length === 0) return <span>[]</span>

      return (
        <span>
          [
          <div className="pl-4">
            {value.map((item, i) => (
              <div key={i}>
                {formatValue(item, indent + 1)}
                {i < value.length - 1 && ","}
              </div>
            ))}
          </div>
          {indentStr}]
        </span>
      )
    }

    if (typeof value === "object") {
      const entries = Object.entries(value)
      if (entries.length === 0) return <span>{"{}"}</span>

      return (
        <span>
          {"{"}
          <div className="pl-4">
            {entries.map(([key, val], i) => (
              <div key={key}>
                <span className="text-purple-600">&quot;{key}&quot;</span>: {formatValue(val, indent + 1)}
                {i < entries.length - 1 && ","}
              </div>
            ))}
          </div>
          {indentStr}
          {"}"}
        </span>
      )
    }

    if (typeof value === "string") return <span className="text-green-600">&quot;{value}&quot;</span>
    if (typeof value === "number") return <span className="text-blue-600">{value}</span>
    if (typeof value === "boolean") return <span className="text-orange-600">{String(value)}</span>

    return <span>{String(value)}</span>
  }

  return (
    <Card>
      <div className="flex items-center justify-between pb-2">
        <h3 className="text-md font-medium">Webhook Payload Preview</h3>
        <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 gap-1 text-xs">
          {copied ? (
            <>Copied</>
          ) : (
            <>
              <Icon icon="RiFileCopyFill" />
              Copy JSON
            </>
          )}
        </Button>
      </div>
      <div className="rounded-md bg-slate-950 p-4 text-sm text-slate-50 font-mono overflow-auto max-h-[400px]">
        {formatValue(data)}
      </div>
    </Card>
  )
}

// Field selector component
const FieldSelector = ({ paths, selectedPath, onChange, className }: { 
  paths: string[], 
  selectedPath: string, 
  onChange: (value: string) => void, 
  className?: string 
}) => {
  return (
    <div className={cn('min-w-[200px] w-fit', className)}>
      <Select
        options={paths.map(path => ({ value: path, label: path }))}
        value={{ value: selectedPath, label: selectedPath }}
        onChange={option => {
          if (option === null) return
          onChange((option as { value: string }).value)
        }}
        isSearchable
        placeholder="Select field"
      />
    </div>
  )
}

// Operator selector component
const OperatorSelector = ({ operators, selectedOperator, onChange, className }: OperatorSelectorProps) => {
  return (
    <div className={cn('min-w-[150px] w-fit', className)}>
      <Select
        options={operators}
        value={{ value: selectedOperator, label: operators.find(op => op.value === selectedOperator)?.label || '' }}
        onChange={(option) => onChange((option as { value: string }).value)}
        placeholder="Select operator"
      />
    </div>
  )
}

// Value input component that adapts based on field type and operator
const ValueInput: React.FC<ValueInputProps> = ({ type, operator, value, onChange }) => {
  if (
    operator === "is_empty" ||
    operator === "is_not_empty" ||
    operator === "any_item" ||
    operator === "all_items" ||
    operator === "no_items"
  ) {
    return null
  }

  if (operator === "in" || operator === "not_in") {
    const values = Array.isArray(value) ? value : value ? value.split(",").map((v: string) => v.trim()) : []

    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {values.map((val, idx: number) => (
            <Badge key={idx} variant="default" className="flex items-center gap-1 px-2 py-1">
              {val}
              <button
                type="button"
                onClick={() => {
                  const newValues = [...values]
                  newValues.splice(idx, 1)
                  onChange(newValues)
                }}
                className="ml-1 rounded-full hover:bg-slate-200 p-0.5"
              >
                <Icon icon="RiCloseFill" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Add value and press Enter"

            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter" && e.currentTarget.value) {
                e.preventDefault()
                const newValues = [...values, e.currentTarget.value]
                onChange(newValues)
                e.currentTarget.value = ""
              }
            }}
          />
        </div>
      </div>
    )
  }

  if (type === "boolean") {
    return (
      <Select
        options={[
          { value: 'true', label: 'true' },
          { value: 'false', label: 'false' }
        ]}
        value={{ value: String(value), label: String(value) }}
        onChange={(option) => onChange((option as { value: string }).value)}
        placeholder="Select value"
      />
    )
  }

  if (type === "number") {
    return (
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  }

  // Default to string input
  return <Input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
}

// Array Item Condition component for handling array item matching
interface ArrayItemConditionProps {
  condition: SimpleCondition & {
    nestedGroup?: BooleanCondition;
  };
  onChange: (condition: SimpleCondition & { nestedGroup?: BooleanCondition }) => void;
  onRemove: () => void;
  paths: string[];
  payload: Record<string, unknown>;
}

const ArrayItemCondition = ({ condition, onChange, onRemove, paths, payload }: ArrayItemConditionProps) => {
  // Extract array path and property from the condition field
  const arrayItemPath = parseArrayItemPath(condition.field);
  if (!arrayItemPath) return null;

  const { arrayPath, propertyName } = arrayItemPath;

  // Get the array from the payload
  const array = getValueFromPath(payload, arrayPath);
  if (!Array.isArray(array)) return null;

  // Get all possible array item properties
  const itemProperties = array.length > 0 && typeof array[0] === "object"
    ? Object.keys(array[0]).map(prop => `${arrayPath}[].${prop}`)
    : [];

  // Initialize nested group if not present
  if (!condition.nestedGroup) {
    condition.nestedGroup = {
      all: [{
        field: `${arrayPath}[].${propertyName}`,
        operator: "==",
        value: ""
      }]
    };
  }

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-none cursor-move">
          <Icon icon="RiDraggable" className="h-5 w-5 text-gray-400" />
        </div>

        <div className="flex-1 flex gap-2">
          <FieldSelector
            paths={paths.filter(p => !p.includes("[]."))}
            selectedPath={arrayPath}
            onChange={(value) => {
              // Update the array path and maintain the property
              const newField = `${value}[].${propertyName}`;
              onChange({
                ...condition,
                field: newField,
                nestedGroup: {
                  all: [{
                    field: newField,
                    operator: condition.nestedGroup?.all?.[0].operator || "==",
                    value: condition.nestedGroup?.all?.[0].value || ""
                  }]
                }
              });
            }}
            className="w-[35%]"
          />

          <div className="w-[35%] flex items-center">
            <span className="text-gray-500 px-2">contains items where</span>
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={onRemove}
          className="flex-none text-slate-500 hover:text-red-500"
        >
          <Icon icon="RiDeleteBinLine" />
        </Button>
      </div>

      <div className="ml-10 pl-4 border-l-2 border-gray-200">
        <ConditionGroup
          group={condition.nestedGroup}
          onChange={(newGroup) => onChange({ ...condition, nestedGroup: newGroup })}
          onRemove={() => {}}
          paths={itemProperties}
          payload={array[0]} // Pass first array item as sample payload
          level={1}
          mode="boolean"
          isArrayItemGroup={true}
        />
      </div>

      {array.length > 0 && typeof array[0] === "object" && (
        <div className="ml-10 pl-4 mt-2">
          <div className="text-sm text-gray-500">
            Available properties: {Object.keys(array[0]).join(", ")}
          </div>
        </div>
      )}
    </div>
  );
};

interface ConditionRowProps {
  condition: SimpleCondition;
  onChange: (condition: SimpleCondition) => void;
  onRemove: () => void;
  paths: string[];
  payload: Record<string, unknown>;
}

const ConditionRow = ({ condition, onChange, onRemove, paths, payload }: ConditionRowProps) => {
  const fieldType = condition.field ? getValueTypeFromPath(payload, condition.field) : null;

  // Handle array item conditions
  if (fieldType === "array-item") {
    return (
      <ArrayItemCondition
        condition={condition}
        onChange={onChange}
        onRemove={onRemove}
        paths={paths}
        payload={payload}
      />
    );
  }

  // Handle array operators that need nested conditions
  if (
    fieldType === "array" &&
    ["any_item", "all_items", "no_items"].includes(condition.operator)
  ) {
    // Initialize nested conditions if not present
    if (!condition.nestedGroup) {
      condition.nestedGroup = {
        all: [],
      };
    }

    // Get array path to extract item properties
    const arrayPath = condition.field;
    const array = getValueFromPath(payload, arrayPath);

    // Get item properties if array has items
    const itemProperties = Array.isArray(array) && array.length > 0 && typeof array[0] === "object"
      ? Object.keys(array[0]).map(prop => `${arrayPath}[].${prop}`)
      : [];

    return (
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-none cursor-move">
            <Icon icon="RiDraggable" className="h-5 w-5 text-gray-400" />
          </div>

          <div className="flex-1 flex gap-2">
            <FieldSelector
              paths={paths.filter(p => !p.includes("[]."))}
              selectedPath={condition.field}
              onChange={(value) => onChange({ ...condition, field: value })}
              className="w-[35%]"
            />

            <OperatorSelector
              operators={operatorsByType.array}
              selectedOperator={condition.operator}
              onChange={(value) => onChange({
                ...condition,
                operator: value as Operator,
                nestedGroup: { all: [] }
              })}
              className="w-[35%]"
            />
          </div>

          <Button
            variant="ghost"
            onClick={onRemove}
            className="flex-none text-gray-500 hover:text-red-500"
          >
            <Icon icon="RiDeleteBinLine" />
          </Button>
        </div>

        <div className="ml-10 pl-4 border-l-2 border-gray-200">
          <div className="text-sm text-gray-500 mb-2">
            {condition.operator === "any_item" && "Where any item matches:"}
            {condition.operator === "all_items" && "Where all items match:"}
            {condition.operator === "no_items" && "Where no items match:"}
          </div>
          <ConditionGroup
            group={condition.nestedGroup}
            onChange={(newGroup) => onChange({ ...condition, nestedGroup: newGroup })}
            onRemove={() => {}}
            paths={itemProperties}
            payload={payload}
            level={1}
            mode="boolean"
            isArrayItemGroup={true}
          />
        </div>
      </div>
    );
  }

  // Regular condition handling
  const operators = fieldType ? operatorsByType[fieldType] || operatorsByType.string : [];

  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="flex-none cursor-move">
        <Icon icon="RiDraggable" className="h-5 w-5 text-gray-400" />
      </div>

      <div className="flex-1 flex gap-2">
        <FieldSelector
          paths={paths}
          selectedPath={condition.field}
          onChange={(value) => onChange({ ...condition, field: value })}
          className="w-[35%]"
        />

        <OperatorSelector
          operators={operators}
          selectedOperator={condition.operator}
          onChange={(value) => onChange({ ...condition, operator: value })}
          className="w-[35%]"
        />

        <ValueInput
          type={fieldType}
          operator={condition.operator}
          value={condition.value}
          onChange={(value) => onChange({ ...condition, value })}
          className="w-[30%]"
        />
      </div>

      <Button
        variant="ghost"
        onClick={onRemove}
        className="flex-none text-gray-500 hover:text-red-500"
      >
        <Icon icon="RiDeleteBinLine" />
      </Button>
    </div>
  );
};

// Condition group component (recursive for nesting)
const ConditionGroup = ({ 
  group, 
  onChange, 
  onRemove, 
  paths, 
  payload, 
  level = 0,
  mode,
  resultType = 'string',
  isArrayItemGroup = false
}: ConditionGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Get the logical operator (all/any/none) from the group
  const getLogicalOperator = (group: BooleanCondition | DecisionCondition): 'all' | 'any' | 'none' => {
    if ('all' in group) return 'all';
    if ('any' in group) return 'any';
    if ('none' in group) return 'none';
    return 'all';
  };

  // Get the conditions array from the group
  const getConditions = (group: BooleanCondition | Condition<string | number>) => {
    const operator = getLogicalOperator(group as BooleanCondition);
    return group[operator] || [];
  };

  const handleAddCondition = () => {
    const operator = getLogicalOperator(group);
    const conditions = getConditions(group);
    
    const newGroup = {
      ...group,
      [operator]: [...conditions, { field: "", operator: "", value: "" }]
    };
    onChange(newGroup);
  };

  const handleAddGroup = () => {
    const operator = getLogicalOperator(group);
    const conditions = getConditions(group);
    
    const newSubGroup = mode === 'decision' 
      ? {
          all: [],
          result: resultType === 'number' ? 0 : ''
        } as DecisionCondition
      : {
          all: []
        } as BooleanCondition;
    
    const newGroup = {
      ...group,
      [operator]: [...conditions, newSubGroup]
    };
    onChange(newGroup);
  };

  const handleTypeChange = (newType: "all" | "any" | "none") => {
    const conditions = getConditions(group);
    const newGroup = {
      [newType]: conditions,
      ...(mode === 'decision' && isDecisionCondition(group) ? { result: group.result } : {})
    };
    onChange(newGroup as typeof group);
  };

  return (
    <Card className="mb-4">
      <div className="flex items-center gap-2 mb-4">
        <Select
          value={getLogicalOperator(group)}
          onValueChange={handleTypeChange}
          options={[
            { value: 'all', label: 'All (AND)' },
            { value: 'any', label: 'Any (OR)' },
            { value: 'none', label: 'None (NOT)' }
          ]}
        />
        
        {mode === 'decision' && !isConstraint(group) && (
          <Input
            type={resultType === 'number' ? 'number' : 'text'}
            placeholder="Result"
            value={group.result}
            onChange={(e) => {
              const value = resultType === 'number' 
                ? Number(e.target.value)
                : e.target.value;
              onChange({ ...group, result: value } as Condition<string | number>);
            }}
            className="w-24"
          />
        )}

        <Button 
          variant="ghost" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2"
        >
          <Icon 
            icon={isExpanded ? "RiArrowDownSLine" : "RiArrowRightSLine"} 
            className="h-5 w-5"
          />
        </Button>

        {level > 0 && (
          <Button 
            variant="ghost" 
            onClick={onRemove}
            className="fill-gray-500 hover:fill-red-500"
          >
            <Icon icon="RiDeleteBinLine" className="h-5 w-5" />
          </Button>
        )}
      </div>

      {isExpanded && (
        <div className="space-y-4 pl-4">
          {getConditions(group).map((condition, index) => (
            <div key={index}>
              {isConstraint(condition) || 'result' in condition ? (
                <ConditionGroup
                  group={condition}
                  onChange={(newGroup) => {
                    const operator = getLogicalOperator(group);
                    const conditions = getConditions(group);
                    conditions[index] = newGroup;
                    onChange({ ...group, [operator]: conditions });
                  }}
                  onRemove={() => {
                    const operator = getLogicalOperator(group);
                    const conditions = getConditions(group);
                    onChange({
                      ...group,
                      [operator]: conditions.filter((_, i) => i !== index)
                    });
                  }}
                  paths={paths}
                  payload={payload}
                  level={level + 1}
                  mode={mode}
                  resultType={resultType}
                />
              ) : (
                <ConditionRow
                  condition={condition}
                  onChange={(newCondition) => {
                    const operator = getLogicalOperator(group);
                    const conditions = getConditions(group);
                    conditions[index] = newCondition;
                    onChange({ ...group, [operator]: conditions });
                  }}
                  onRemove={() => {
                    const operator = getLogicalOperator(group);
                    const conditions = getConditions(group);
                    onChange({
                      ...group,
                      [operator]: conditions.filter((_, i) => i !== index)
                    });
                  }}
                  paths={paths}
                  payload={payload}
                />
              )}
            </div>
          ))}
          
          <div className="flex gap-2">
            <Button 
              onClick={handleAddCondition} 
              variant="secondary" 
              className="text-slate-700 font-normal"
            >
              Add Condition
            </Button>
            <Button 
              onClick={handleAddGroup} 
              variant="secondary" 
              className="text-slate-700 font-normal"
            >
              Add Group
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

// Helper component to create an example rule for array items
const ArrayItemExample = ({ payload }) => {
  const [rule, setRule] = useState({
    combinator: "all",
    conditions: [
      {
        field: "user.identifiers",
        operator: "any_item",
        nestedGroup: {
          combinator: "all",
          conditions: [
            { field: "user.identifiers[].system", operator: "==", value: "https://foo.com" },
            { field: "user.identifiers[].value", operator: "==", value: "foo" },
          ],
          groups: [],
        },
      },
    ],
    groups: [],
  })

  return (
    <Card className="mb-6">
      <div className="mb-4">
        <h3 className="text-md font-medium">Example: Match Identifier with System "https://foo.com" and Value "foo"</h3>
      </div>
      <JSONPreview data={rule} />
    </Card>
  )
}

// Main rule builder component
export const ConditionRuleBuilder = ({ 
  mode = 'boolean',
  resultType = 'string',
  onChange,
  initialRule 
}: ConditionRuleBuilderProps) => {
  const [rule, setRule] = useState<BooleanRule | DecisionRule>(() => 
    initialRule || {
      conditions: mode === 'boolean' 
        ? { 
            all: [{
              field: "",
              operator: "",
              value: ""
            }]
          }
        : [ 
            {
              all: [{
                field: "",
                operator: "",
                value: ""
              }],
              result: resultType === 'number' ? 0 : ''
            }
          ],
      ...(mode === 'decision' ? { default: resultType === 'number' ? 0 : '' } : {})
    } as BooleanRule | DecisionRule
  );
  const [selectedTab, setSelectedTab] = useState("payload");

  const handleRuleChange = (newRule: BooleanRule | DecisionRule) => {
    setRule(newRule);
    onChange?.(newRule);
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        {mode === 'decision' && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Default Result</label>
            <Input
              type={resultType === 'number' ? 'number' : 'text'}
              value={rule.default}
              onChange={(e) => {
                const value = resultType === 'number' 
                  ? Number(e.target.value)
                  : e.target.value;
                handleRuleChange({ ...rule, default: value });
              }}
              className="w-24"
            />
          </div>
        )}
        <Tab
          variant="default"
          size="md"
          items={[
            {
              id: "payload",
              label: "Sample Payload",
              onClick: (item) => setSelectedTab(item.id),
              className: selectedTab === "payload" ? "tab-active" : ""
            },
            {
              id: "json",
              label: "JSON",
              onClick: (item) => setSelectedTab(item.id),
              className: selectedTab === "json" ? "tab-active" : ""
            },
          ]}
          selected={selectedTab}
        />
        <div className="mt-4">
          {selectedTab === "json" && <JSONPreview data={formatRuleForPreview(rule)} />}
          {selectedTab === "payload" && <JSONPreview data={samplePayload} />}
        </div>
      </Card>
      {mode === 'decision' ? (
        // Render decision mode groups
        (rule.conditions as Array<Condition<string | number>>).map((condition, index) => (
          <ConditionGroup
            key={index}
            group={condition}
            onChange={(newGroup) => {
              const newConditions = [...(rule.conditions as Array<Condition<string | number>>)];
              newConditions[index] = newGroup;
              handleRuleChange({ ...rule, conditions: newConditions });
            }}
            onRemove={() => {
              const newConditions = (rule.conditions as Array<Condition<string | number>>).filter((_, i) => i !== index);
              handleRuleChange({ ...rule, conditions: newConditions });
            }}
            paths={getPathsFromObject(samplePayload)}
            payload={samplePayload}
            mode={mode}
            resultType={resultType}
          />
        ))
      ) : (
        // Render boolean mode group
        <ConditionGroup
          group={rule.conditions as BooleanCondition}
          onChange={(newGroup) => handleRuleChange({ ...rule, conditions: newGroup })}
          onRemove={() => {}}
          paths={getPathsFromObject(samplePayload)}
          payload={samplePayload}
          mode={mode}
        />
      )}
      
      <div className="flex gap-2">
        <Button
          onClick={() => {
            handleRuleChange({
              ...rule,
              conditions: [
                ...(Array.isArray(rule.conditions) ? rule.conditions : []),
                {
                  all: [{
                    field: "",
                    operator: "",
                    value: ""
                  }],
                  ...(mode === 'decision' && { result: resultType === 'number' ? 0 : '' })
                }
              ]
            } as Rule<boolean> | Rule<string | number>);
          }}
          variant="secondary"
          className="text-slate-700 font-normal"
        >
          Add Rule Group
        </Button>
      </div>
    </div>
  );
};

const formatRuleForPreview = (rule: BooleanRule | DecisionRule): BooleanRule | DecisionRule => {
  // Clean up empty values and normalize structure
  const cleanConditions = (conditions: SimpleCondition[] | BooleanCondition[] | DecisionCondition[]): any => {
    // Handle boolean mode (BooleanCondition)
    if (!Array.isArray(conditions)) {
      const operator = getLogicalOperator(conditions);
      return {
        [operator]: cleanConditions(conditions[operator] || [])
      };
    }

    // Handle array of conditions
    return conditions
      .filter(condition => {
        if ('field' in condition) {
          return condition.field && condition.operator;
        }
        return (condition.all?.length || condition.any?.length || condition.none?.length);
      })
      .map(condition => {
        if ('all' in condition) {
          return { 
            ...condition, 
            all: cleanConditions(condition.all || [])
          };
        }
        if ('any' in condition) {
          return { ...condition, any: cleanConditions(condition.any || []) };
        }
        if ('none' in condition) {
          return { ...condition, none: cleanConditions(condition.none || []) };
        }
        return condition;
      });
  };

  return {
    ...rule,
    conditions: cleanConditions(rule.conditions)
  };
};
