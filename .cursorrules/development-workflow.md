# Development Workflow

## When Creating New Components

### Step 1: Check Design System First
Before creating any new component, always check if `@awell-health/design-system` has a similar component:

```typescript
// ✅ Check these first:
import { Button, Card, Modal, Input, Select } from '@awell-health/design-system';
import { RichText } from '@awell-health/design-system/rich-text';
```

### Step 2: Use Design System Component
If a design system component exists, use it with proper configuration:

```typescript
// ✅ Good - Using design system component
<Button 
  variant="primary" 
  size="md" 
  onClick={handleSubmit}
  disabled={isLoading}
>
  {isLoading ? 'Submitting...' : 'Submit'}
</Button>

// ❌ Avoid - Creating custom button
const CustomButton = ({ children, onClick, ...props }) => (
  <button className="custom-btn" onClick={onClick} {...props}>
    {children}
  </button>
);
```

### Step 3: Create Custom Component (Only if Needed)
If no design system component exists, create a custom component that follows design system patterns:

```typescript
// ✅ Good - Custom component following design system patterns
interface CustomWidgetProps {
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'highlighted';
  className?: string;
}

export const CustomWidget: React.FC<CustomWidgetProps> = ({
  title,
  children,
  variant = 'default',
  className
}) => {
  return (
    <Card className={cn(
      'p-4',
      variant === 'highlighted' && 'border-primary-500',
      className
    )}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {children}
    </Card>
  );
};
```

### Step 4: Consider Contributing Back
If you create a useful custom component, consider contributing it to the design system:

```typescript
// Document the component well for potential contribution
/**
 * CustomWidget - A specialized widget component
 * 
 * This component provides [specific functionality] that isn't covered
 * by existing design system components. Consider contributing this
 * to @awell-health/design-system if it becomes widely used.
 */
```

## File Organization

### Component Structure
```typescript
// ✅ Good - Following design system patterns
components/
  forms/
    UserProfileForm.tsx      // Uses design system form components
    CustomWidget.tsx         // Custom component following DS patterns
  layouts/
    DashboardLayout.tsx      // Uses design system layout components
  pages/
    UserProfile.tsx          // Uses design system components
```

### Import Organization
```typescript
// ✅ Good - Organized imports
// Design system imports first
import { 
  Button, 
  Card, 
  Modal, 
  Input, 
  Select,
  FormSection,
  FormContent,
  FormButtons 
} from '@awell-health/design-system';
import { RichText } from '@awell-health/design-system/rich-text';

// Third-party imports
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Local imports
import { CustomWidget } from './CustomWidget';
import { useUserData } from '../hooks/useUserData';
```

## Migration Strategy

### When Refactoring Existing Code

1. **Identify Custom Components**
   ```typescript
   // Before: Custom button implementation
   const CustomButton = ({ children, onClick }) => (
     <button className="btn btn-primary" onClick={onClick}>
       {children}
     </button>
   );
   ```

2. **Replace with Design System Component**
   ```typescript
   // After: Using design system Button
   import { Button } from '@awell-health/design-system';
   
   <Button variant="primary" onClick={onClick}>
     {children}
   </Button>
   ```

3. **Update Styling**
   ```typescript
   // Before: Custom CSS classes
   <div className="custom-card custom-theme">
     <h2 className="custom-title">Title</h2>
   </div>
   
   // After: Design system components
   <Card className="bg-white dark:bg-gray-800">
     <h2 className="text-xl font-semibold">Title</h2>
   </Card>
   ```

4. **Update Tests**
   ```typescript
   // Before: Custom selectors
   expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
   
   // After: Design system component selectors
   expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
   // Design system components maintain consistent accessibility
   ```

## Testing Guidelines

### Use Design System Components in Tests
```typescript
// ✅ Good - Testing with design system components
import { render, screen } from '@testing-library/react';
import { Button, Input, FormSection } from '@awell-health/design-system';

test('form submission works', () => {
  render(
    <FormSection>
      <Input data-testid="email-input" type="email" />
      <Button data-testid="submit-btn">Submit</Button>
    </FormSection>
  );
  
  expect(screen.getByTestId('email-input')).toBeInTheDocument();
  expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
});
```

### Leverage Design System Props
```typescript
// ✅ Good - Using design system component props for testing
<Button 
  variant="primary" 
  size="md" 
  disabled={isLoading}
  data-testid="submit-button"
>
  Submit
</Button>

// Test different states
expect(screen.getByTestId('submit-button')).toBeDisabled();
expect(screen.getByTestId('submit-button')).toHaveClass('btn-primary');
```

## Performance Guidelines

### Tree Shaking
Design system components support tree shaking - only import what you need:

```typescript
// ✅ Good - Specific imports
import { Button, Card, Modal } from '@awell-health/design-system';

// ❌ Avoid - Importing everything
import * as DesignSystem from '@awell-health/design-system';
```

### Lazy Loading for Heavy Components
```typescript
// ✅ Good - Lazy load RichText when needed
const RichText = lazy(() => import('@awell-health/design-system/rich-text'));

function MyComponent() {
  const [showEditor, setShowEditor] = useState(false);
  
  return (
    <div>
      <Button onClick={() => setShowEditor(true)}>Edit</Button>
      {showEditor && (
        <Suspense fallback={<Spinner />}>
          <RichText />
        </Suspense>
      )}
    </div>
  );
}
``` 