import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for todos
let todos = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Learn Redux", completed: false },
  { id: 3, text: "Build a TODO app", completed: false },
];

let nextId = 4;

// GET all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// GET single todo
app.get("/api/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  res.json(todo);
});

// POST create new todo
app.post("/api/todos", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  const newTodo = {
    id: nextId++,
    text,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT update todo
app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    ...req.body,
    id, // Ensure id doesn't change
  };

  res.json(todos[todoIndex]);
});

// DELETE todo
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todos.splice(todoIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
