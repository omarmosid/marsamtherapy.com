# UI Components

Common UI components for forms and interface elements. These components maintain consistent styling and behavior across the site.

## Components

### Button

Button component with multiple variants and sizes.

**Props:**
- `href?` - Optional URL for link button
- `type?` - Button type: 'button' | 'submit' | 'reset' (default: 'button')
- `variant?` - Style variant: 'primary' | 'secondary' | 'outline' (default: 'primary')
- `size?` - Size: 'sm' | 'md' | 'lg' (default: 'md')
- `fullWidth?` - Full width button (default: false)
- `class?` - Additional CSS classes

**Usage:**
```astro
<Button type="submit" variant="primary" size="lg">Submit</Button>
<Button href="/about" variant="outline">Learn More</Button>
```

### Input

Text input component with label support.

**Props:**
- `type?` - Input type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'number' (default: 'text')
- `id` - Input ID (required)
- `name` - Input name (required)
- `label?` - Label text
- `placeholder?` - Placeholder text
- `required?` - Required field (default: false)
- `value?` - Initial value
- `class?` - Additional CSS classes

**Usage:**
```astro
<Input
	type="email"
	id="email"
	name="email"
	label="Email Address"
	placeholder="your@email.com"
	required
/>
```

### Textarea

Multi-line text input with label support.

**Props:**
- `id` - Textarea ID (required)
- `name` - Textarea name (required)
- `label?` - Label text
- `placeholder?` - Placeholder text
- `required?` - Required field (default: false)
- `rows?` - Number of rows (default: 5)
- `value?` - Initial value
- `class?` - Additional CSS classes

**Usage:**
```astro
<Textarea
	id="message"
	name="message"
	label="Your Message"
	rows={8}
	required
/>
```

### Select

Dropdown select component with label support.

**Props:**
- `id` - Select ID (required)
- `name` - Select name (required)
- `label?` - Label text
- `required?` - Required field (default: false)
- `options` - Array of { value, label } objects (required)
- `value?` - Selected value
- `class?` - Additional CSS classes

**Usage:**
```astro
<Select
	id="service"
	name="service"
	label="Select Service"
	options={[
		{ value: 'therapy', label: 'Individual Therapy' },
		{ value: 'counseling', label: 'Counseling' }
	]}
	required
/>
```

### Checkbox

Checkbox input with label.

**Props:**
- `id` - Checkbox ID (required)
- `name` - Checkbox name (required)
- `label` - Label text (required)
- `checked?` - Initially checked (default: false)
- `required?` - Required field (default: false)
- `class?` - Additional CSS classes

**Usage:**
```astro
<Checkbox
	id="agree"
	name="agree"
	label="I agree to the terms and conditions"
	required
/>
```

### Label

Standalone label component with required indicator.

**Props:**
- `for` - Target input ID (required)
- `required?` - Show required indicator (default: false)
- `class?` - Additional CSS classes

**Usage:**
```astro
<Label for="email" required>Email Address</Label>
```

## Styling

All components use the theme's color system defined in `src/styles/global.css`:

- Background: `bg-night-light`
- Border: `border-night-lighter`
- Text: `text-charcoal`
- Focus: `focus:border-primary focus:ring-primary/20`
- Primary button: `bg-primary text-white hover:bg-primary-light`

## Best Practices

1. **Always use these components** instead of raw HTML form elements
2. **Use semantic types** - e.g., `type="email"` for email inputs
3. **Include labels** for accessibility
4. **Mark required fields** with the `required` prop
5. **Consistent spacing** - Use Tailwind spacing utilities between form elements
6. **Form validation** - Browser validation is built-in via `required` prop
