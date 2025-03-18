import { Operator, Constraint } from "rulepilot"
import { SelectItem } from "@/components/ui/form/select/types"
import { operatorsByType } from "./operators"

export type ResultType = number | string

export interface PathInfo {
  path: string
  type: string
}

export interface SimpleCondition {
  field: string
  operator: Operator
  value: Constraint['value']
}

// Base condition group structure
interface BaseConditionGroup {
  all?: (SimpleCondition | ConditionGroup)[]
  any?: (SimpleCondition | ConditionGroup)[]
  none?: (SimpleCondition | ConditionGroup)[]
}

// Boolean mode just uses the base structure
export type BooleanConditionGroup = BaseConditionGroup

// Decision mode adds a result field
export interface DecisionConditionGroup<T extends ResultType = ResultType> extends BaseConditionGroup {
  result: T
}

// The final union type for a condition group
export type ConditionGroup = BooleanConditionGroup | DecisionConditionGroup

// Top-level structure for decision mode
export interface DecisionRule<T extends ResultType = ResultType> {
  conditions: DecisionConditionGroup<T>[]
  default: T
}

// The complete rule type depending on mode
export type Rule = BooleanConditionGroup | DecisionRule

export interface ConditionRuleBuilderProps {
  payload: Record<string, unknown>
  mode: 'boolean' | 'decision'
  onChange?: (rule: Rule) => void
  initialRule?: Rule
}

export interface ConditionGroupProps {
  group: ConditionGroup
  onChange: (group: ConditionGroup) => void
  paths: PathInfo[]
  payload: Record<string, unknown>
}

export interface ConditionRowProps {
  condition: SimpleCondition
  onChange: (condition: SimpleCondition) => void
  onRemove: () => void
  paths: string[]
  fieldType: keyof typeof operatorsByType
}

export interface SortableItemProps {
  id: string
  condition: SimpleCondition | ConditionGroup
  onRemove: () => void
  onChange: (condition: SimpleCondition | ConditionGroup) => void
  paths: PathInfo[]
  payload: Record<string, unknown>
}

export const booleanOperators: SelectItem[] = [
  { value: 'all', label: 'All of (AND)' },
  { value: 'any', label: 'Any of (OR)' },
  { value: 'none', label: 'None of (NOT)' }
]

export const isSimpleCondition = (condition: SimpleCondition | ConditionGroup): condition is SimpleCondition => {
  return 'field' in condition
}

export const getFieldType = (field: string, paths: PathInfo[]): keyof typeof operatorsByType => {
  return paths.find(p => p.path === field)?.type as keyof typeof operatorsByType || 'string'
}

// Helper type guard to check if we're dealing with a decision condition
export const isDecisionConditionGroup = (
  condition: ConditionGroup
): condition is DecisionConditionGroup => {
  return 'result' in condition
}

// Helper type guard to check if we're dealing with a decision rule
export const isDecisionRule = (
  rule: Rule
): rule is DecisionRule => {
  return 'conditions' in rule && 'default' in rule
}
