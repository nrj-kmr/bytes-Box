#!/bin/bash

# This script helps create new shadcn/ui style components in the UI package

# Check if a component name was provided
if [ -z "$1" ]; then
  echo "Please provide a component name (in PascalCase)"
  echo "Usage: ./create-component.sh Button"
  exit 1
fi

COMPONENT_NAME=$1
FILENAME=$(echo "$COMPONENT_NAME" | tr '[:upper:]' '[:lower:]')

echo "Creating new component: $COMPONENT_NAME in src/$FILENAME.tsx"

# Create the component file
cat > src/$FILENAME.tsx << EOL
import * as React from "react";
import { cn } from "./lib/utils";

interface ${COMPONENT_NAME}Props extends React.HTMLAttributes<HTMLDivElement> {
  // Add your props here
}

export const ${COMPONENT_NAME} = React.forwardRef<HTMLDivElement, ${COMPONENT_NAME}Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Add your default classes here
          className
        )}
        {...props}
      />
    );
  }
);

${COMPONENT_NAME}.displayName = "${COMPONENT_NAME}";
EOL

echo "Component created successfully at src/$FILENAME.tsx"

# Update index.ts to export the new component
echo "Updating src/index.ts to export the new component"
echo "export * from './$FILENAME';" >> src/index.ts

# Add to package.json exports
echo "Remember to add the component to package.json exports:"
echo "    \"./$FILENAME\": \"./src/$FILENAME.tsx\","

echo "Done! Your new component is ready to use."