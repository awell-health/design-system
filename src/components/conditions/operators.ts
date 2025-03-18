// Operator options based on value type
export const allOperatorTypes = {
  EQUALS: { value: '==', label: 'equals' },
  NOT_EQUALS: { value: '!=', label: 'not equals' },
  GREATER_THAN: { value: '>', label: 'greater than' },
  GREATER_THAN_OR_EQUAL: { value: '>=', label: 'greater than or equal' },
  LESS_THAN: { value: '<', label: 'less than' },
  LESS_THAN_OR_EQUAL: { value: '<=', label: 'less than or equal' },
  IN: { value: 'in', label: 'in list' },
  NOT_IN: { value: 'not_in', label: 'not in list' }
} as const;

export const operatorsByType = {
  string: [
    allOperatorTypes.EQUALS,
    allOperatorTypes.NOT_EQUALS,
    allOperatorTypes.IN,
    allOperatorTypes.NOT_IN
  ],
  number: [
    allOperatorTypes.EQUALS,
    allOperatorTypes.NOT_EQUALS,
    allOperatorTypes.GREATER_THAN,
    allOperatorTypes.GREATER_THAN_OR_EQUAL,
    allOperatorTypes.LESS_THAN,
    allOperatorTypes.LESS_THAN_OR_EQUAL,
    allOperatorTypes.IN,
    allOperatorTypes.NOT_IN
  ],
  boolean: [allOperatorTypes.EQUALS, allOperatorTypes.NOT_EQUALS],
  object: [allOperatorTypes.EQUALS, allOperatorTypes.NOT_EQUALS]
} as const;
