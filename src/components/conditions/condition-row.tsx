"use client"

import { Constraint, Operator } from "rulepilot"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/form/select"
import { Input } from "@/components/ui/form/input"
import { Icon } from "@/components/ui/icon"
import { Card } from "@/components/ui/card"
import { SelectItem } from "@/components/ui/form/select/types"
import { operatorsByType } from "./operators"

interface SimpleCondition {
  field: string
  operator: Operator
  value: Constraint['value']
}

interface ConditionRowProps {
  condition: SimpleCondition
  onChange: (condition: SimpleCondition) => void
  onRemove: () => void
  paths: string[]
  fieldType: keyof typeof operatorsByType
}

export const ConditionRow = ({ condition, onChange, onRemove, paths, fieldType }: ConditionRowProps) => {
  const operators = operatorsByType[fieldType] || operatorsByType.string

  const pathOptions: SelectItem[] = paths.map(path => ({
    value: path,
    label: path
  }))

  const operatorOptions: SelectItem[] = operators.map(op => ({
    value: op.value,
    label: op.label
  }))

  return (
    <Card className="p-4 w-full">
      <div className="flex items-center gap-2 w-full">
        <div className="flex-grow-0">
        <Select
          value={{ value: condition.field, label: condition.field }}
          onChange={(option) => {
            if (option === null) return;
            onChange({ ...condition, field: (option as SelectItem).value });
          }}
          options={pathOptions}
          isSearchable
        />
        </div>
        <div className="flex-grow-0">
        <Select
          value={{ value: condition.operator, label: operators.find(op => op.value === condition.operator)?.label || '' }}
          onChange={(option) => onChange({ ...condition, operator: (option as SelectItem).value as Operator })}
          options={operatorOptions}
        />

        </div>
        
        <Input
          value={condition.value as string}
          onChange={(e) => onChange({ ...condition, value: e.target.value })}
          className="flex-grow"
        />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-slate-500 hover:text-red-500"
        >
          <Icon icon="RiDeleteBinLine" />
        </Button>
      </div>
    </Card>
  )
}
