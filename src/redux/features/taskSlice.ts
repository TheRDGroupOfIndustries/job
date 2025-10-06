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
        return rejectWithValue("Failed to fetch job");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getEmployeeTasks = createAsyncThunk(
  "task/getEmployeeTasks",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState() as any; 
      // console.log("auth", auth)
      const response = await fetch(`/api/kanban/employee/${auth.userData._id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        return rejectWithValue("Failed to fetch job");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTaskStatus = createAsyncThunk(
  "task/updateTaskStatus",
  async ({newData, id}: {newData: any, id: string}, { rejectWithValue }) => {
    try {
      // console.log("details:", {newData, id})
      const response = await fetch(`/api/kanban/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newData)
      });

      if (!response.ok) {
        return rejectWithValue("Failed to fetch job");
      }
      const data = await response.json();
      // console.log(data)
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/kanban/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        return rejectWithValue("Failed to fetch job");
      }
      const data = await response.json();
      // console.log(data)
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
        // console.log("action", action.payload)
        state.tasks = action.payload;
      })
      .addCase(getEmployeeTasks.fulfilled, (state, action) => {
        // console.log("action", action.payload)
        state.tasks = action.payload;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        // console.log("action", action.payload)
        state.tasks = state.tasks.map((task) => {
          if (task._id === action.payload.task._id) {
            return action.payload.task;
          }
          return task;
        });
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        // console.log("action", action.payload)
        state.tasks = state.tasks.filter((task) => task._id !== action.payload.task._id);
      })

  },
});

export default taskSlice.reducer;
