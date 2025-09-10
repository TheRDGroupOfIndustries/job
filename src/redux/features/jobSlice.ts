import { IJob } from "@/models/Job";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface JobsState {
  jobs: IJob[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: JobsState = {
  jobs: [],
  status: "idle",
  error: null,
};

// ✅ Create Job (POST)
export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (details, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/job/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(details),
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

// ✅ Fetch Jobs (GET)
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/job/get", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        return rejectWithValue("Failed to fetch jobs");
      }

      const data: IJob[] = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Update Job (PUT)
export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async (details: IJob, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/job/update/${details._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(details),
      });

      if (!response.ok) {
        return rejectWithValue("Failed to update job");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Delete Job (DELETE)
export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (jobId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/job/delete/${jobId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        return rejectWithValue("Failed to update job");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Fetch
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.jobs = action.payload.jobs;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // Create
    builder
      .addCase(createJob.fulfilled, (state, action: PayloadAction<any>) => {
        state.jobs.unshift(action.payload.job);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Update
    builder
      .addCase(updateJob.fulfilled, (state, action: PayloadAction<any>) => {
        state.jobs = state.jobs.map((job) =>
          job._id === action.payload.job._id ? action.payload.job : job
        );
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Delete
    builder
      .addCase(deleteJob.fulfilled, (state, action: PayloadAction<any>) => {
        state.jobs = state.jobs.filter(
          (job) => job._id !== action.payload.job._id
        );
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { } = jobsSlice.actions;
export default jobsSlice.reducer;
