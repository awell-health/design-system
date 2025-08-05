# Design System Component Priority

## Always prefer @awell-health/design-system components over custom implementations

### Component Priority Hierarchy

1. **Form Components** (Highest Priority)
   - Use `Input`, `Textarea`, `Select`, `Checkbox`, `Toggle` from design system
   - Use `FormSection`, `FormContent`, `FormButtons` for form layout
   - Use `Label`, `ListInput` for form labels and list inputs
   - Use `DateRangeSelect` for date selection

2. **Layout & Structure Components**
   - Use `Card` for content containers
   - Use `Divider` for visual separation
   - Use `Modal` for overlays and dialogs
   - Use `Drawer` for slide-out panels
   - Use `Alert` and `AlertDialog` for notifications

3. **Interactive Components**
   - Use `Button` for all clickable actions
   - Use `Dropdown` for selection menus
   - Use `Menu` for navigation menus
   - Use `Tab` for tabbed interfaces
   - Use `Pagination` for list navigation

4. **Data Display Components**
   - Use `Table` for tabular data
   - Use `Badge` for status indicators
   - Use `Avatar` for user representations
   - Use `FileList` and `FileUpload` for file handling
   - Use `CopyText` for copyable content
   - Use `SkeletonLoader` for loading states
   - Use `Spinner` for loading indicators
   - Use `RadialProgress` for progress indicators

5. **Icon & Visual Components**
   - Use `Icon` for all icons
   - Use `ActionIcon` for clickable icons
   - Use `DataPointIcon` for data visualization
   - Use `Tooltip` for hover information

6. **Rich Text & Content**
   - Use `RichText` for rich text editing (import separately: `@awell-health/design-system/rich-text`)

### Import Patterns

```typescript
// Preferred import patterns:
import { Button, Card, Modal } from '@awell-health/design-system';
import { RichText } from '@awell-health/design-system/rich-text';
```

### Anti-Patterns to Avoid

- Don't create custom button components when design system `Button` exists
- Don't build custom form components when design system form components exist
- Don't use raw HTML elements when design system components are available
- Don't override design system component styles without proper justification
- Don't create custom modal/dialog implementations 