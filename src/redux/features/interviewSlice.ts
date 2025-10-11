import { Interview } from "@/types/Interview";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchInterviews = createAsyncThunk(
  "interview/fetchInterviews",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/interview");
      const data = await res.json();
      return data.interviews;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Failed to fetch");
    }
  }
);

export const createInterview = createAsyncThunk(
  "interview/createInterview",
  async (interviewData, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interviewData),
      });
      const data = await res.json();
      return data.interview;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Failed to create");
    }
  }
);

export const updateInterview = createAsyncThunk(
  "interview/updateInterview",
  async (
    { interviewId, updateData }: { interviewId: string; updateData: any },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(`/api/interview/${interviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      const data = await res.json();
      return data.interview;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Failed to update");
    }
  }
);

export const deleteInterview = createAsyncThunk(
  "interview/deleteInterview",
  async (interviewId: string, { rejectWithValue }) => {
    try {
      await fetch(`/api/interview/${interviewId}`, {
        method: "DELETE",
      });
      console.log(`Interview ${interviewId} deleted successfully`);
      return interviewId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Failed to delete");
    }
  }
);

interface InterviewState {
  interviews: Interview[] | [];
  loading: boolean;
  error: any;
}

const interviewSlice = createSlice({
  name: "interview",
  initialState: {
    interviews: [],
    loading: false,
    error: null,
  } as InterviewState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchInterviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInterviews.fulfilled, (state, action) => {
        state.loading = false;
        state.interviews = action.payload;
      })
      .addCase(fetchInterviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createInterview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInterview.fulfilled, (state, action) => {
        state.loading = false;
        state.interviews.unshift(action.payload as never);
      })
      .addCase(createInterview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateInterview.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(updateInterview.fulfilled, (state, action) => {
        // state.loading = false;
        state.interviews = state.interviews.map((i: any) =>
          i._id === action.payload._id ? action.payload : i
        );
      })
      .addCase(updateInterview.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteInterview.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(deleteInterview.fulfilled, (state, action) => {
        // state.loading = false;
        state.interviews = state.interviews.filter(
          (i: any) => i._id !== action.payload
        );
      })
      .addCase(deleteInterview.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
      });
  },
});

export default interviewSlice.reducer;
