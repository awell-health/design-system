# Component Usage Guidelines

## Button Variants
Use design system button variants instead of custom styling:
```typescript
// ✅ Good
<Button variant="primary" size="md">Submit</Button>
<Button variant="secondary" size="sm">Cancel</Button>

// ❌ Avoid
<button className="custom-button">Submit</button>
```

## Form Validation
Use design system form components with built-in validation patterns:
```typescript
// ✅ Good
<FormSection>
  <Label htmlFor="email">Email</Label>
  <Input 
    id="email" 
    type="email" 
    required 
    error={errors.email}
  />
</FormSection>

// ❌ Avoid
<div className="form-group">
  <label>Email</label>
  <input type="email" className="form-control" />
</div>
```

## Responsive Design
Design system components are already responsive - don't add custom responsive classes:
```typescript
// ✅ Good
<Card className="p-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Input placeholder="Name" />
    <Input placeholder="Email" />
  </div>
</Card>

// ❌ Avoid
<div className="card custom-responsive-card">
  <input className="responsive-input" />
</div>
```

## Accessibility
Design system components include proper ARIA attributes:
```typescript
// ✅ Good
<Button aria-label="Close modal">
  <Icon name="close" />
</Button>

// ❌ Avoid
<button className="close-btn">
  <span>×</span>
</button>
```

## Theming
Use design system theming instead of custom CSS:
```typescript
// ✅ Good
<Card className="bg-white dark:bg-gray-800">
  <Badge variant="success">Active</Badge>
</Card>

// ❌ Avoid
<div className="custom-card custom-theme">
  <span className="status-badge">Active</span>
</div>
```

## Common Patterns

### Form Layout
```typescript
<FormContent>
  <FormSection title="Personal Information">
    <Label htmlFor="name">Name</Label>
    <Input id="name" placeholder="Enter your name" />
    
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="Enter your email" />
  </FormSection>
  
  <FormButtons>
    <Button variant="secondary">Cancel</Button>
    <Button variant="primary">Submit</Button>
  </FormButtons>
</FormContent>
```

### Modal Usage
```typescript
// For confirmations and complex forms
<Modal isOpen={isOpen} onClose={onClose}>
  <Modal.Header>Confirm Action</Modal.Header>
  <Modal.Body>Are you sure you want to proceed?</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={onClose}>Cancel</Button>
    <Button variant="danger" onClick={onConfirm}>Delete</Button>
  </Modal.Footer>
</Modal>

// For simple confirmations
<AlertDialog
  isOpen={isOpen}
  onClose={onClose}
  title="Delete Item"
  description="This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
  onConfirm={onDelete}
/>
```

### Table Display
```typescript
<Table>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
      <Table.HeaderCell>Actions</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>John Doe</Table.Cell>
      <Table.Cell><Badge variant="success">Active</Badge></Table.Cell>
      <Table.Cell>
        <ActionIcon icon="edit" onClick={onEdit} />
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
``` 