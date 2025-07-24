# Quantum Assignment Server

A well-structured Express.js server with TypeScript, MongoDB, and proper MVC architecture.

## Project Structure

```
src/
├── config/          # Configuration files
│   └── database.ts  # Database connection setup
├── constants/       # Application constants
│   └── index.ts     # HTTP status codes, messages, etc.
├── controllers/     # Route controllers (business logic)
│   ├── databaseController.ts
│   ├── healthController.ts
│   └── userController.ts
├── middleware/      # Custom middleware functions
│   └── index.ts     # CORS, logging, error handling
├── models/          # Database models
│   └── User.ts      # User schema and model
├── routes/          # Route definitions
│   ├── databaseRoutes.ts
│   ├── healthRoutes.ts
│   ├── userRoutes.ts
│   └── index.ts     # Main router
├── types/           # TypeScript type definitions
│   └── env.d.ts     # Environment variables types
└── index.ts         # Main application entry point
```

## Installation

```bash
bun install
```

## Running the Server

### Development
```bash
bun run dev
```

### Production
```bash
bun run build
bun run start
```

## API Endpoints

### Health & Info
- `GET /` - API information and available endpoints
- `GET /health` - Health check endpoint
- `GET /api/db-status` - Database connection status

### Users (CRUD Operations)
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user by ID
- `DELETE /api/users/:id` - Delete user by ID

## Features

### ✅ Well-Organized Architecture
- **Controllers**: Handle business logic
- **Routes**: Define API endpoints
- **Middleware**: Custom middleware for CORS, logging, error handling
- **Models**: Database schemas with validation
- **Constants**: Centralized constants and messages

### ✅ Enhanced Error Handling
- Comprehensive error responses
- Validation error handling
- Database error handling
- Global error middleware

### ✅ Improved API Responses
- Consistent response format
- Success/error status indicators
- Detailed error messages
- Request logging

### ✅ Additional Features
- Full CRUD operations for users
- Enhanced database status endpoint
- 404 handling for unknown API routes
- OPTIONS request handling for CORS

## Example API Usage

### Create User
```bash
POST /api/users
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "securepassword"
}
```

## Environment Variables

See `.env.example` for all available environment variables.

This project was created using `bun init` in bun v1.2.18. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
