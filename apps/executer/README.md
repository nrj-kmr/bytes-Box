# BytesBox Executor Service

The Executor Service is a crucial component of the BytesBox platform that safely executes code snippets in various programming languages using containerized environments. It provides a secure and isolated execution context for running user code while preventing security vulnerabilities.

## Features

- **Multi-language Support**: Execute code in Python, JavaScript/Node.js, Java, C/C++, and more
- **Containerized Execution**: Run code in isolated Docker containers for security
- **Resource Limiting**: Control CPU, memory, and execution time constraints
- **Standard I/O Handling**: Capture stdout, stderr, and provide stdin capabilities
- **File System Operations**: Support for file operations within the execution environment

## Architecture

The executor service is structured as follows:

```
executer/
├── src/
│   ├── controllers/     # Request handlers for code execution
│   ├── middlewares/     # Authentication and validation middleware
│   ├── routes/          # API routes definition
│   ├── services/        # Core execution logic and Docker interaction
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── docker/              # Docker configurations for various languages
│   ├── c/               # C/C++ execution environment
│   ├── java/            # Java execution environment
│   ├── node/            # Node.js execution environment
│   └── python/          # Python execution environment
```

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Containerization**: Docker
- **Server APIs**: RESTful API with JSON payloads
- **Security**: JWT authentication, container isolation

## API Endpoints

The executor service exposes the following primary endpoints:

- `POST /api/execute`: Execute code in the specified language
- `GET /api/languages`: Get list of supported languages and their configurations
- `GET /api/status`: Check service health and status

### Execute Code Endpoint

```json
// POST /api/execute
// Request
{
  "language": "python",
  "code": "print('Hello, World!')",
  "stdin": "",
  "files": [],
  "timeout": 10000
}

// Response
{
  "success": true,
  "output": "Hello, World!\n",
  "error": "",
  "executionTime": 42
}
```

## Development

### Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose
- npm (v10 or later)

### Local Setup

1. Install dependencies:

```bash
npm install
```

2. Ensure Docker is running on your machine

3. Start the development server:

```bash
npm run dev
```

The service will be available at `http://localhost:3001` by default.

### Docker Environments

The executor service uses custom Docker images for each supported programming language. These are defined in the `docker` directory.

To rebuild the Docker images:

```bash
# From the executer directory
docker-compose -f docker/docker-compose.yml build
```

### Configuration

The executor service can be configured using the following environment variables:

- `PORT`: The port on which the service listens (default: 3001)
- `MAX_EXECUTION_TIME`: Maximum allowed execution time in ms (default: 10000)
- `MAX_MEMORY`: Maximum memory allocation in MB (default: 100)
- `AUTH_SECRET`: Secret key for JWT authentication

## Security Considerations

The executor service implements several security measures:

1. **Container Isolation**: Each code execution happens in a dedicated Docker container
2. **Resource Limits**: CPU, memory, and execution time are strictly limited
3. **Network Restrictions**: Containers have no network access by default
4. **File System Isolation**: Code executes in an isolated file system
5. **User Permissions**: Containers run as non-root users

## Integration with Other Services

The executor service is primarily called by the API service, which acts as a proxy between the web frontend and the execution environment.