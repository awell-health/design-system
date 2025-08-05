# Styling Guidelines

## Tailwind CSS Integration

### Use Design System Compatible Classes
The design system is built with Tailwind CSS. Use compatible classes:

```typescript
// ✅ Good - Using Tailwind classes compatible with design system
<Card className="p-6 bg-white shadow-lg rounded-lg">
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-gray-900">Title</h2>
    <p className="text-gray-600">Description</p>
  </div>
</Card>

// ❌ Avoid - Custom CSS that might conflict
<div className="custom-card custom-padding custom-shadow">
  <h2 className="custom-title">Title</h2>
</div>
```

### Color Tokens
Use design system color tokens instead of custom colors:

```typescript
// ✅ Good - Using design system color tokens
<Badge className="bg-primary-500 text-white">Primary</Badge>
<Button className="bg-secondary-100 text-secondary-800">Secondary</Button>
<Alert className="bg-success-50 border-success-200 text-success-800">
  Success message
</Alert>

// ❌ Avoid - Custom color values
<Badge className="bg-blue-500 text-white">Primary</Badge>
<Button className="bg-gray-100 text-gray-800">Secondary</Button>
```

### Spacing Values
Follow design system spacing patterns:

```typescript
// ✅ Good - Consistent spacing
<div className="space-y-4 p-6">
  <Input className="mb-4" />
  <Button className="mt-2" />
</div>

// ❌ Avoid - Inconsistent spacing
<div className="space-y-2 p-8">
  <Input className="mb-6" />
  <Button className="mt-1" />
</div>
```

## Typography Patterns

### Use Design System Typography Classes
```typescript
// ✅ Good - Design system typography
<h1 className="text-3xl font-bold text-gray-900">Page Title</h1>
<h2 className="text-xl font-semibold text-gray-800">Section Title</h2>
<h3 className="text-lg font-medium text-gray-700">Subsection</h3>
<p className="text-base text-gray-600">Body text</p>
<small className="text-sm text-gray-500">Caption</small>

// ❌ Avoid - Custom typography
<h1 className="custom-title">Page Title</h1>
<p className="custom-body-text">Body text</p>
```

### Consistent Font Weights
```typescript
// ✅ Good - Standard font weights
<Button className="font-medium">Medium Weight</Button>
<Label className="font-semibold">Semibold Label</Label>
<Badge className="font-bold">Bold Badge</Badge>

// ❌ Avoid - Custom font weights
<Button className="font-light">Light Weight</Button>
```

## Component Styling

### Extending Design System Components
When you need to extend design system components, use the `className` prop:

```typescript
// ✅ Good - Extending with className
<Card className="border-l-4 border-l-primary-500 bg-primary-50">
  <h3 className="text-primary-800 font-semibold">Special Card</h3>
</Card>

<Button className="w-full md:w-auto bg-gradient-to-r from-primary-500 to-primary-600">
  Gradient Button
</Button>

// ❌ Avoid - Overriding component styles
<Card style={{ borderLeft: '4px solid blue', backgroundColor: '#f0f8ff' }}>
  <h3 style={{ color: '#1e40af', fontWeight: 600 }}>Special Card</h3>
</Card>
```

### Conditional Styling
Use conditional classes for dynamic styling:

```typescript
// ✅ Good - Conditional styling with Tailwind
<Badge className={cn(
  'px-3 py-1 rounded-full',
  status === 'active' && 'bg-success-100 text-success-800',
  status === 'inactive' && 'bg-gray-100 text-gray-600',
  status === 'pending' && 'bg-warning-100 text-warning-800'
)}>
  {status}
</Badge>

// ❌ Avoid - Inline styles or complex conditionals
<Badge style={{ 
  backgroundColor: status === 'active' ? '#dcfce7' : '#f3f4f6',
  color: status === 'active' ? '#166534' : '#4b5563'
}}>
  {status}
</Badge>
```

## Animation and Transitions

### Use Design System Animation Classes
```typescript
// ✅ Good - Design system animations
<Button className="transition-all duration-200 hover:scale-105">
  Hover Effect
</Button>

<Modal className="animate-in fade-in duration-300">
  Modal Content
</Modal>

// ❌ Avoid - Custom animations
<Button className="custom-hover-animation">
  Hover Effect
</Button>
```

## Utility Classes

### Common Utility Patterns
```typescript
// ✅ Good - Common utility patterns
<div className="flex items-center justify-between">
  <div className="flex items-center space-x-2">
    <Icon name="user" className="w-5 h-5" />
    <span>User Name</span>
  </div>
  <Button size="sm">Action</Button>
</div>

// Loading states
<div className="flex items-center justify-center p-8">
  <Spinner className="w-8 h-8" />
</div>

// Empty states
<div className="text-center py-12">
  <Icon name="empty" className="w-16 h-16 mx-auto text-gray-400 mb-4" />
  <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
  <p className="text-gray-600">Try adjusting your search criteria.</p>
</div>
```

## CSS Custom Properties

### Avoid Custom CSS When Possible
```typescript
// ✅ Good - Using Tailwind utilities
<div className="bg-gradient-to-r from-primary-500 to-secondary-500">
  Gradient Background
</div>

// ❌ Avoid - Custom CSS properties
<div style={{ 
  background: 'linear-gradient(to right, var(--primary), var(--secondary))' 
}}>
  Gradient Background
</div>
```

## Best Practices Summary

1. **Always use Tailwind classes** that are compatible with the design system
2. **Use design system color tokens** instead of custom colors
3. **Follow consistent spacing patterns** (4, 6, 8, 12, 16, 20, 24, 32, etc.)
4. **Use standard typography classes** for consistent text styling
5. **Extend components with className** rather than overriding styles
6. **Support dark mode** with appropriate classes
7. **Use responsive classes** for mobile-first design
8. **Leverage design system animations** for consistent interactions
9. **Avoid custom CSS** unless absolutely necessary
10. **Test components** in both light and dark modes 