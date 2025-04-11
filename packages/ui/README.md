# BytesBox UI Package

This package contains UI components built with shadcn/ui for use across all BytesBox applications.

## Features

- Pre-configured Tailwind CSS setup with shadcn/ui theming
- Reusable UI components with consistent styling
- Dark mode support
- Type-safe components

## Usage

### Importing Components

You can import components from the UI package in any app within the monorepo:

```tsx
// Import a specific component
import { Button } from "@repo/ui";

// Use the component
function MyComponent() {
  return (
    <Button variant="default">Click Me</Button>
  );
}
```

### Available Components

- `Button`: A customizable button component with various styles and sizes
- `Card`: A card container with header, content, and footer sections

### Using Styles

To use the UI package's styles in your app, import them in your app's main CSS file:

```css
@import "@repo/ui/styles";
```

## Adding New Components

To add a new shadcn/ui component to this package:

1. Create a new file in the `src/` directory (e.g., `input.tsx`)
2. Implement the component following the shadcn/ui pattern
3. Export it from `src/index.ts`
4. Add it to the exports in `package.json`

## Theming

The theme is defined in `src/styles/globals.css` with CSS variables. You can customize the colors and other design tokens there.

## Dark Mode

Dark mode is supported through the `.dark` class on the root HTML element. Use the `ThemeToggle` component to allow users to switch between light and dark mode.