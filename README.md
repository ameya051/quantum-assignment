# Quantum Assignment 🌊

A modern full-stack authentication application with a beautiful ocean-themed UI, built with React, Express, and MongoDB.

## 🚀 Features

- **Modern Authentication System**: Complete user registration and login functionality
- **Beautiful Ocean-themed UI**: Stunning gradient backgrounds and animated ocean wave effects
- **Form Validation**: Comprehensive client and server-side validation using Zod
- **Responsive Design**: Mobile-first design that works on all devices
- **Type Safety**: Full TypeScript support across frontend and backend
- **Modern Tech Stack**: Latest versions of React, Express, and MongoDB

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Server state management
- **React Hook Form** - Performant forms with easy validation
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Zod** - TypeScript-first schema validation
- **Lucide React** - Beautiful icons

### Backend
- **Bun** - Fast JavaScript runtime and package manager
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Zod** - Schema validation

## 📁 Project Structure

```
quantum-assignment/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/        # Base UI components (buttons, inputs, etc.)
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── UsersTable.tsx
│   │   ├── pages/         # Page components
│   │   ├── routes/        # Route definitions
│   │   ├── apis/          # API client functions
│   │   ├── schemas/       # Zod validation schemas
│   │   ├── types/         # TypeScript type definitions
│   │   └── lib/           # Utility functions
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Express backend application
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── validators/    # Request validation
│   │   ├── config/        # Configuration files
│   │   └── types/         # TypeScript type definitions
│   └── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **Bun** (latest version)
- **MongoDB** (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ameya051/quantum-assignment.git
   cd quantum-assignment
   ```

2. **Install dependencies**

   **Frontend:**
   ```bash
   cd client
   bun install
   ```

   **Backend:**
   ```bash
   cd server
   bun install
   ```

3. **Environment Setup**

   Create a `.env` file in the `server` directory:
   ```env
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/quantum-assignment
   JWT_SECRET=your-super-secure-jwt-secret-key
   NODE_ENV=development
   ```

4. **Start the development servers**

   **Backend (Terminal 1):**
   ```bash
   cd server
   bun run dev
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd client
   bun run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## 📱 Application Features

### 🔐 Authentication
- **User Registration**: Create new accounts with name, email, date of birth, and password
- **User Login**: Secure login with email and password
- **Password Security**: Bcrypt hashing for secure password storage
- **JWT Tokens**: Stateless authentication using JSON Web Tokens
- **Form Validation**: Real-time validation with helpful error messages

### 🎨 UI/UX Features
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern Forms**: Sleek input fields with icons and hover effects
- **Loading States**: Visual feedback during form submissions
- **Error Handling**: User-friendly error messages and validation

### 🛡️ Security Features
- **Input Validation**: Server and client-side validation using Zod schemas
- **Password Hashing**: Secure password storage with bcrypt
- **CORS Protection**: Cross-Origin Resource Sharing configuration
- **Request Logging**: Comprehensive request logging for debugging
- **Error Handling**: Centralized error handling middleware

## 🌐 API Endpoints

### Authentication Routes
```
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Health Check
```
GET /health
```

## 👨‍💻 Author

**Ameya** - [GitHub](https://github.com/ameya051)

## 🙏 Acknowledgments

- Thanks to the React and Node.js communities
- Inspired by modern web design trends
- Built with love and lots of coffee ☕

---

**Happy Coding!** 🚀✨
