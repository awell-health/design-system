"use client"

import { Select, SelectItem } from "@/components/ui/form/select"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { ConditionRow } from "./condition-row"
import {
  BooleanConditionGroup,
  SimpleCondition,
  ConditionGroup as ConditionGroupType,
  PathInfo,
  isSimpleCondition,
  getFieldType,
  isDecisionConditionGroup,
  ResultType
} from "./types"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Input } from "../ui/form/input"

interface SortableItemProps {
  id: string
  condition: SimpleCondition | ConditionGroupType
  onRemove: () => void
  onChange: (condition: SimpleCondition | ConditionGroupType) => void
  paths: PathInfo[]
  payload: Record<string, unknown>
}

const SortableItem = ({ id, condition, onRemove, onChange, paths, payload }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div style={style} className="flex items-start gap-2">
      <div 
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="cursor-grab p-2 text-slate-400 hover:text-slate-600"
      >
        <Icon icon="RiDraggable" />
      </div>
      <div className="flex-1 pl-2 border-l-2 border-slate-200">
        {isSimpleCondition(condition) ? (
          <ConditionRow
            condition={condition}
            onChange={onChange}
            onRemove={onRemove}
            paths={paths.map(p => p.path)}
            fieldType={getFieldType(condition.field, paths)}
          />
        ) : (
          <ConditionGroup
            group={condition}
            onChange={onChange}
            onRemove={onRemove}
            paths={paths}
            payload={payload}
          />
        )}
      </div>
    </div>
  )
}

interface ConditionGroupProps {
  group: ConditionGroupType
  onChange: (group: ConditionGroupType) => void
  onRemove?: () => void
  paths: PathInfo[]
  payload: Record<string, unknown>
}

const booleanOperators = [
  { value: 'all', label: 'All of (AND)' },
  { value: 'any', label: 'Any of (OR)' },
  { value: 'none', label: 'None of (NOT)' }
];

export const ConditionGroup = ({ group, onChange, paths, payload, onRemove }: ConditionGroupProps) => {
  const operator = Object.keys(group).find(key => ['all', 'any', 'none'].includes(key)) as keyof BooleanConditionGroup
  const conditions = group[operator] || []
  const isDecision = isDecisionConditionGroup(group)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleOperatorChange = (newOp: { value: string; label: string } | null) => {
    if (!newOp) return
    const newGroup = {
      [newOp.value]: conditions,
      ...(isDecision ? { result: group.result } : {})
    } as ConditionGroupType
    onChange(newGroup)
  }

  const handleResultChange = (newResult: ResultType) => {
    if (!isDecision) return
    // Try to convert to number if possible, otherwise keep as string
    const parsedResult = !isNaN(Number(newResult)) ? Number(newResult) : newResult
    onChange({ ...group, result: parsedResult })
  }

  const handleConditionChange = (index: number, condition: SimpleCondition | ConditionGroupType) => {
    const newConditions = [...conditions]
    newConditions[index] = condition
    onChange({ 
      [operator]: newConditions,
      ...(isDecision ? { result: group.result } : {})
    } as ConditionGroupType)
  }

  const handleAddCondition = () => {
    const firstPath = paths[0]
    const newCondition: SimpleCondition = {
      field: firstPath.path,
      operator: "==",
      value: ""
    }
    onChange({ 
      [operator]: [...conditions, newCondition],
      ...(isDecision ? { result: group.result } : {})
    } as ConditionGroupType)
  }

  const handleAddGroup = () => {
    const newGroup: BooleanConditionGroup = { all: [] }
    onChange({ 
      [operator]: [...conditions, newGroup],
      ...(isDecision ? { result: group.result } : {})
    } as ConditionGroupType)
  }

  const handleRemoveCondition = (index: number) => {
    const newConditions = conditions.filter((_, i) => i !== index)
    onChange({ 
      [operator]: newConditions,
      ...(isDecision ? { result: group.result } : {})
    } as ConditionGroupType)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = conditions.findIndex((_, i) => `condition-${i}` === active.id)
      const newIndex = conditions.findIndex((_, i) => `condition-${i}` === over.id)

      const newConditions = arrayMove(conditions, oldIndex, newIndex)
      onChange({ 
        [operator]: newConditions,
        ...(isDecision ? { result: group.result } : {})
      } as ConditionGroupType)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Select
          value={{ value: operator, label: booleanOperators.find(op => op.value === operator)?.label || '' }}
          onChange={(option) => {
            if (!option || Array.isArray(option)) return;
            handleOperatorChange(option as SelectItem);
          }}
          options={booleanOperators}
        />
        {isDecision && (
          <Input
            value={String(group.result)}
            onChange={(e) => handleResultChange(e.target.value)}
            className="w-[200px]"
            placeholder="Enter result value..."
          />
        )}
        <Button variant="ghost" onClick={handleAddCondition}>
          <Icon icon="RiAddFill" /> Add Condition
        </Button>
        <Button variant="ghost" onClick={handleAddGroup}>
          <Icon icon="RiAddFill" /> Add Group
        </Button>
        {onRemove && (
          <Button
            variant="ghost"
            onClick={onRemove}
            className="ml-auto text-slate-500 hover:text-red-500"
          >
            <Icon icon="RiDeleteBinLine" />
          </Button>
        )}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={conditions.map((_, i) => `condition-${i}`)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {conditions.map((condition, index) => (
              <SortableItem
                key={`condition-${index}`}
                id={`condition-${index}`}
                condition={condition}
                onChange={(newCondition) => handleConditionChange(index, newCondition)}
                onRemove={() => handleRemoveCondition(index)}
                paths={paths}
                payload={payload}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}


