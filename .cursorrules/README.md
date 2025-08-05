# Cursor Rules for @awell-health/design-system

This `.cursorrules` folder contains rules to help Cursor prioritize the use of `@awell-health/design-system` components in your development workflow.

## Structure

- **`design-system-priority.md`** - Main priority rules and component hierarchy
- **`component-usage.md`** - Guidelines for using design system components
- **`development-workflow.md`** - Development process and best practices
- **`styling-guidelines.md`** - Tailwind CSS and styling guidelines

## How to Use

1. **Place this folder** in the root of your consuming application (not in the design system itself)
2. **Cursor will automatically** use these rules to provide better suggestions
3. **Follow the guidelines** when creating new components or refactoring existing code

## Key Benefits

- **Intelligent Suggestions**: Cursor will suggest design system components first
- **Import Optimization**: Automatic suggestions for correct import patterns
- **Code Consistency**: Ensures all developers use the same components
- **Reduced Duplication**: Prevents creating custom components when design system ones exist
- **Better Maintainability**: Centralizes component usage and reduces technical debt

## Quick Start

When building UI components, Cursor will now:

1. **Suggest design system components** before custom implementations
2. **Provide correct import statements** for `@awell-health/design-system`
3. **Show usage examples** with proper props and variants
4. **Warn against anti-patterns** like creating custom buttons when design system Button exists

## Example

Instead of:
```typescript
// ❌ Custom implementation
const CustomButton = ({ children, onClick }) => (
  <button className="btn btn-primary" onClick={onClick}>
    {children}
  </button>
);
```

Cursor will suggest:
```typescript
// ✅ Design system component
import { Button } from '@awell-health/design-system';

<Button variant="primary" onClick={onClick}>
  {children}
</Button>
```

## Maintenance

- Update these rules when new components are added to the design system
- Review and refine rules based on team feedback
- Keep rules in sync with design system documentation and Storybook examples 