import { IKanban } from "@/models/Kanban";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface TaskState {
  tasks: IKanban[];
}

export const createTask = createAsyncThunk(
  "task/createTask",
  async (task, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/kanban", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        return rejectWithValue("Failed to create job");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTasks = createAsyncThunk(
  "task/getTask",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/kanban", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        return rejectWithValue("Failed to create job");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload.task);
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        console.log("action", action.payload)
        state.tasks = action.payload;
      });
  },
});

export default taskSlice.reducer;
