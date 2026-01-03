import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchTodosAsync,
  addTodoAsync,
  toggleTodoAsync,
  deleteTodoAsync,
  setFilter,
  selectFilteredTodos,
  selectStatus,
  selectFilter,
} from "./todosSlice";
import styles from "./Todos.module.css";

export const Todos = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectFilteredTodos);
  const status = useAppSelector(selectStatus);
  const filter = useAppSelector(selectFilter);
  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, [dispatch]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      dispatch(addTodoAsync(newTodoText));
      setNewTodoText("");
    }
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodoAsync(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodoAsync(id));
  };

  if (status === "loading") {
    return <div className={styles.loading}>Loading todos...</div>;
  }

  if (status === "failed") {
    return <div className={styles.error}>Failed to load todos. Please try again.</div>;
  }

  return (
    <div className={styles.todos}>
      <div className={styles.header}>
        <h1>todos</h1>
      </div>

      <form onSubmit={handleAddTodo} className={styles.addTodo}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div className={styles.filters}>
        <button
          className={filter === "all" ? styles.active : ""}
          onClick={() => dispatch(setFilter("all"))}
        >
          All
        </button>
        <button
          className={filter === "active" ? styles.active : ""}
          onClick={() => dispatch(setFilter("active"))}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? styles.active : ""}
          onClick={() => dispatch(setFilter("completed"))}
        >
          Completed
        </button>
      </div>

      {todos.length === 0 ? (
        <div className={styles.empty}>No todos to show</div>
      ) : (
        <ul className={styles.todoList}>
          {todos.map((todo) => (
            <li key={todo.id} className={styles.todoItem}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
              <span className={todo.completed ? styles.completed : ""}>
                {todo.text}
              </span>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
