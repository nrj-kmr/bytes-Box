# BytesBox Web Interface

The BytesBox web interface is a modern, responsive frontend application that provides the user interface for the BytesBox code execution and collaboration platform.

## Features

- **Code Editor**: Built with Monaco Editor for a powerful IDE-like experience
- **Terminal Emulation**: Interactive terminal using xterm.js for command execution
- **File Tree**: Visual representation of project file structure
- **Tabs**: Multi-file workspace management with tabs
- **Themes**: Light and dark mode support
- **Real-time Collaboration**: Work together with others in real-time

## Architecture

The web application is structured as follows:

```
web/
├── public/              # Static assets
├── src/
│   ├── components/      # UI components
│   │   ├── Editor/      # Code editor component
│   │   ├── FileTree/    # File browser component
│   │   ├── Tabs/        # Tab management component
│   │   └── Terminal/    # Terminal emulation component
│   ├── lib/             # Utility libraries
│   ├── pages/           # Page components
│   ├── services/        # API service integrations
│   ├── store/           # State management with Recoil
│   └── styles/          # CSS and style definitions
```

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: Recoil
- **Editor**: Monaco Editor
- **Terminal**: xterm.js
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Development

### Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The output will be in the `dist` directory.

### Environment Variables

The web application can be configured using the following environment variables:

- `VITE_API_URL`: URL of the API service
- `VITE_EXECUTER_URL`: URL of the code execution service
- `VITE_COLLAB_URL`: URL of the collaboration server

## Integration with Other Services

The web application communicates with several backend services:

- **API Service**: For user authentication and project management
- **Executor Service**: For running code in various languages
- **Collaboration Server**: For real-time collaboration features

## Contributing

When contributing to this part of the project, please follow the established component structure and use the shared UI components from the `@repo/ui` package when appropriate.
