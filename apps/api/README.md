# BytesBox API Service

The API service is the core backend component of the BytesBox platform that handles user authentication, project management, data persistence, and serves as the central communication hub between various other services.

## Features

- **Authentication & Authorization**: User registration, login, and session management
- **Project Management**: Create, update, delete, and share coding projects
- **File Operations**: File creation, modification, and organization
- **User Management**: User profiles, preferences, and settings
- **Service Orchestration**: Communication with executor and collaboration services

## Architecture

The API service follows a clean architecture pattern and is structured as follows:

```
api/
├── prisma/             # Database schema and migrations
├── src/
│   ├── config/         # Application configuration
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Authentication and validation middleware
│   ├── routes/         # API routes definition
│   ├── services/       # Business logic implementation
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions and helpers
```

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **API**: RESTful API endpoints
- **Validation**: Zod schema validation

## API Endpoints

The API service exposes endpoints for various resources:

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Authenticate a user
- `POST /api/auth/refresh`: Refresh an access token
- `POST /api/auth/logout`: Invalidate a user's session

### Projects
- `GET /api/projects`: List user's projects
- `POST /api/projects`: Create a new project
- `GET /api/projects/:id`: Get project details
- `PUT /api/projects/:id`: Update a project
- `DELETE /api/projects/:id`: Delete a project
- `POST /api/projects/:id/share`: Share a project with other users

### Files
- `GET /api/projects/:id/files`: List files in a project
- `POST /api/projects/:id/files`: Create a new file
- `GET /api/files/:id`: Get file content
- `PUT /api/files/:id`: Update file content
- `DELETE /api/files/:id`: Delete a file

### Execution
- `POST /api/execute`: Execute code (proxy to executor service)

## Development

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL database
- npm (v10 or later)

### Local Setup

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

Create a `.env` file with the following variables:
```
DATABASE_URL=postgresql://username:password@localhost:5432/bytesbox
JWT_SECRET=your-secret-key
PORT=3000
EXECUTOR_SERVICE_URL=http://localhost:3001
```

3. Set up the database:

```bash
npx prisma migrate dev
```

4. Start the development server:

```bash
npm run dev
```

The API service will be available at `http://localhost:3000` by default.

### Database Migrations

When changing the database schema:

```bash
# Generate a migration
npx prisma migrate dev --name description-of-changes

# Apply migrations
npx prisma migrate deploy
```

## Environment Variables

The API service can be configured using the following environment variables:

- `PORT`: The port on which the service listens (default: 3000)
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRES_IN`: Token expiration time (default: '1d')
- `EXECUTOR_SERVICE_URL`: URL of the executor service
- `COLLAB_SERVICE_URL`: URL of the collaboration service

## Integration with Other Services

The API service integrates with:

- **Executor Service**: For executing code in various programming languages
- **Collaboration Service**: For real-time collaboration features
- **Web Frontend**: Serves as the backend for the web application