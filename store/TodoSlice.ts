import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {type Todo} from "@/index"


interface TodosState {
  todos: Todo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch todos
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(
    "http://frontendtest.ideallco.com/api/todos/fetch/all"
  );
  return response.data.data;
});

// Async thunk to update a todo's completion status
export const updateTodoStatus = createAsyncThunk(
  "todos/updateTodoStatus",
  async ({ id, is_completed }: { id: string; is_completed: boolean }) => {
    const response = await axios.put(
      `http://frontendtest.ideallco.com/api/todos/update/${id}`,
      { is_completed }
    );
    return { id, is_completed }; // Return updated values
  }
);

// Async thunk to create a new todo
export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (newTodo: {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
  }) => {
    const response = await axios.post(
      "http://frontendtest.ideallco.com/api/todos/create",
      newTodo
    );
    return response.data.data; // Return created todo
  }
);

// Async thunk to delete a todo
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string) => {
    const response = await axios.delete(
      `http://frontendtest.ideallco.com/api/todos/delete/${id}`
    );
    return id; // Return the id of the deleted todo
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch todos";
      })
      // Update Todo Status
      .addCase(updateTodoStatus.fulfilled, (state, action) => {
        const todo = state.todos.find((todo) => todo._id === action.payload.id);
        if (todo) {
          todo.is_completed = action.payload.is_completed;
        }
      })
      .addCase(updateTodoStatus.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update todo status";
      })
      // Create Todo
      .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload); // Add the new todo to the list
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.error = action.error.message || "Failed to create todo";
      })
      // Delete Todo
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete todo";
      });
  },
});

export default todosSlice.reducer;
