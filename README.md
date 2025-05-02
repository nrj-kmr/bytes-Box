# BytesBox

BytesBox is a collaborative code execution and development environment that allows developers to create, share, and execute code in various programming languages. This project is structured as a monorepo using Turborepo for efficient workspace management and dependency sharing.

<!-- ![BytesBox Logo](/apps/web/public/byteBox.png) -->
<img src="/apps/web/public/byteBox.png" alt="BytesBox Logo" width="200" />

## Project Overview

BytesBox consists of several integrated services that work together to provide a seamless coding experience:

- **Web Interface**: A modern React application for code editing, file management, and collaboration
- **API**: Backend service handling user authentication, project management, and data persistence
- **Executor**: Service for executing code snippets in various programming languages using Docker containers

## Project Structure

This monorepo is organized as follows:

```
bytesbox/
├── apps/               # Application services
│   ├── api/            # Backend REST API
│   ├── docs/           # Project documentation
│   ├── executer/       # Code execution service
│   └── web/            # Frontend web application
├── packages/           # Shared libraries and configurations
│   ├── config/         # Shared configuration files
│   ├── eslint-config/  # ESLint configurations
│   ├── types/          # Shared TypeScript type definitions
│   ├── typescript-config/ # Shared TypeScript configurations
│   └── ui/             # Shared UI component library
```

## Technologies

BytesBox is built with a modern tech stack:

- **Frontend**: React, TypeScript, Vite, TailwindCSS
- **Backend**: Node.js, Express
- **Code Execution**: Docker containers for secure code execution
- **Development**: Turborepo, TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v10 or later)
- Docker and Docker Compose (for the code execution service)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/bytesbox.git
cd bytesbox
```

2. Install dependencies
```bash
npm install
```

3. Start the development environment
```bash
npm run dev
```

## Development

### Build

To build all apps and packages:

```bash
npm run build
```

### Development Server

To start the development servers for all applications:

```bash
npm run dev
```

## Documentation

For more detailed documentation about the system architecture and individual components, see the [documentation](/apps/docs/system-architecture.md).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
