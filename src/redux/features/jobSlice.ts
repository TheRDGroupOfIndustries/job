import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
}

interface JobsState {
  jobs: Job[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: JobsState = {
  jobs: [],
  status: "idle",
  error: null,
};


export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  try {
    const response = await fetch("/api/job/get", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;

  }
});

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    // You can add synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<{ jobs: Job[] }>) => {
        state.status = "succeeded";
        state.jobs = action.payload.jobs;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch jobs";
      });
  },
});


export default jobsSlice.reducer;
