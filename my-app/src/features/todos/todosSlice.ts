import { createAppSlice } from "../../app/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "./todosAPI";
import * as todosAPI from "./todosAPI";

export interface TodosState {
  todos: Todo[];
  status: "idle" | "loading" | "failed";
  filter: "all" | "active" | "completed";
}

const initialState: TodosState = {
  todos: [],
  status: "idle",
  filter: "all",
};

export const todosSlice = createAppSlice({
  name: "todos",
  initialState,
  reducers: create => ({
    setFilter: create.reducer((state, action: PayloadAction<"all" | "active" | "completed">) => {
      state.filter = action.payload;
    }),
    fetchTodosAsync: create.asyncThunk(
      async () => {
        const response = await todosAPI.fetchTodos();
        return response;
      },
      {
        pending: state => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.todos = action.payload;
        },
        rejected: state => {
          state.status = "failed";
        },
      },
    ),
    addTodoAsync: create.asyncThunk(
      async (text: string) => {
        const response = await todosAPI.createTodo(text);
        return response;
      },
      {
        fulfilled: (state, action) => {
          state.todos.push(action.payload);
        },
      },
    ),
    toggleTodoAsync: create.asyncThunk(
      async (id: number, { getState }) => {
        const state = getState() as { todos: TodosState };
        const todo = state.todos.todos.find(t => t.id === id);
        if (!todo) throw new Error("Todo not found");
        
        const response = await todosAPI.updateTodo(id, { completed: !todo.completed });
        return response;
      },
      {
        fulfilled: (state, action) => {
          const index = state.todos.findIndex(t => t.id === action.payload.id);
          if (index !== -1) {
            state.todos[index] = action.payload;
          }
        },
      },
    ),
    deleteTodoAsync: create.asyncThunk(
      async (id: number) => {
        await todosAPI.deleteTodo(id);
        return id;
      },
      {
        fulfilled: (state, action) => {
          state.todos = state.todos.filter(t => t.id !== action.payload);
        },
      },
    ),
  }),
  selectors: {
    selectTodos: state => state.todos,
    selectStatus: state => state.status,
    selectFilter: state => state.filter,
    selectFilteredTodos: state => {
      switch (state.filter) {
        case "active":
          return state.todos.filter(t => !t.completed);
        case "completed":
          return state.todos.filter(t => t.completed);
        default:
          return state.todos;
      }
    },
  },
});

export const { setFilter, fetchTodosAsync, addTodoAsync, toggleTodoAsync, deleteTodoAsync } =
  todosSlice.actions;

export const { selectTodos, selectStatus, selectFilter, selectFilteredTodos } =
  todosSlice.selectors;
