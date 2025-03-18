"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ConditionGroup } from "./condition-group"
import { 
  BooleanConditionGroup,
  DecisionRule,
  Rule,
  PathInfo,
  isDecisionRule,
  ResultType
} from "./types"

interface ConditionRuleBuilderProps {
  payload: Record<string, unknown>
  mode: 'boolean' | 'decision'
  onChange?: (rule: Rule) => void
  initialRule?: Rule
}

export const ConditionRuleBuilder = ({
  payload,
  mode = 'boolean',
  onChange,
  initialRule
}: ConditionRuleBuilderProps) => {
  const [rule, setRule] = useState<Rule>(() => {
    if (initialRule) return initialRule
    return mode === 'boolean' 
      ? { all: [] } 
      : { conditions: [], default: 0 }
  })

  // Extract all possible paths and their types from the payload
  const extractPaths = (obj: Record<string, unknown>, prefix = ''): PathInfo[] => {
    return Object.entries(obj).flatMap(([key, value]) => {
      const currentPath = prefix ? `${prefix}.${key}` : key
      
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return extractPaths(value as Record<string, unknown>, currentPath)
      }
      
      return [{
        path: currentPath,
        type: Array.isArray(value) ? 'array' : typeof value
      }]
    })
  }

  const paths = extractPaths(payload)

  const handleChange = (newRule: Rule) => {
    setRule(newRule)
    onChange?.(newRule)
  }

  return (
    <Card className="p-4">
      <div className="space-y-4">
        {isDecisionRule(rule) ? (
          <>
            {rule.conditions.map((condition, index) => (
              <ConditionGroup
                key={index}
                group={condition}
                onChange={(newGroup) => {
                  const newConditions = [...rule.conditions]
                  newConditions[index] = newGroup
                  handleChange({ ...rule, conditions: newConditions })
                }}
                paths={paths}
                payload={payload}
              />
            ))}
          </>
        ) : (
          <ConditionGroup
            group={rule}
            onChange={handleChange}
            paths={paths}
            payload={payload}
          />
        )}
      </div>
    </Card>
  )
}
