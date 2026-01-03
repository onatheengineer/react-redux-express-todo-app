# React Redux Express TODO App

A full-stack TODO application built with React, Redux Toolkit, and Express.js.

## Features

- Create, read, update, and delete todos
- Mark todos as completed
- Filter todos by status (All, Active, Completed)
- Redux Toolkit for state management
- Express.js REST API backend
- Vite for fast development

## Project Structure

```
.
├── my-app/           # React frontend
│   └── src/
│       ├── features/
│       │   └── todos/    # Todo feature with Redux slice
│       └── app/          # Redux store configuration
└── server/           # Express backend
    └── server.js     # API endpoints
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install backend dependencies:

```bash
cd server
npm install
```

2. Install frontend dependencies:

```bash
cd my-app
npm install
```

### Running the Application

1. Start the Express server (from the `server` directory):

```bash
npm run dev
```

The server will run on http://localhost:3001

2. In a new terminal, start the React app (from the `my-app` directory):

```bash
npm run dev
```

The app will open at http://localhost:5173

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a single todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Tech Stack

### Frontend

- React 18
- Redux Toolkit
- TypeScript
- Vite
- CSS Modules

### Backend

- Express.js
- CORS middleware
- In-memory data storage

## Development

The Vite dev server is configured to proxy API requests to the Express server, so you can develop both frontend and backend simultaneously.
