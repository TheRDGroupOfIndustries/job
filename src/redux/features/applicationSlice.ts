import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// -------------------- THUNKS -------------------- //

// Fetch all applications
export const fetchApplications = createAsyncThunk(
  "applications/fetchApplications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/user/applications/get-all", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        return rejectWithValue("Failed to fetch applications");
      }

      const data = await response.json();
      return data.applications;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Accept an application
export const acceptApplication = createAsyncThunk(
  "applications/acceptApplication",
  async (applicationId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/user/applications/admin/accept/${applicationId}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      if (!response.ok) {
        return rejectWithValue("Failed to accept application");
      }

      const data = await response.json();
      return data.application;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Reject (delete) an application
export const rejectApplication = createAsyncThunk(
  "applications/rejectApplication",
  async (applicationId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/user/applications/admin/reject/${applicationId}`,
        {
          method: "DELETE", // delete instead of patch
          credentials: "include",
        }
      );

      if (!response.ok) {
        return rejectWithValue("Failed to delete application");
      }

      return applicationId; // return deleted app ID
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteApplication = createAsyncThunk(
  "applications/deleteApplication",
  async (applicationId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/user/applications/admin/reject/${applicationId}`, 
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        return rejectWithValue("Failed to delete application");
      }

      return applicationId; // return deleted app ID so we can remove it from state
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// -------------------- STATE -------------------- //

interface ApplicationState {
  applications: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ApplicationState = {
  applications: [],
  loading: false,
  error: null,
};

// -------------------- SLICE -------------------- //

export const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ---- Fetch ----
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ---- Accept ----
    builder
      .addCase(acceptApplication.pending, (state) => {
        state.loading = true;
        toast.loading("Accepting application...", { id: "application-update" });
      })
      .addCase(acceptApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.applications = state.applications.map((app) =>
          app._id === action.payload._id
            ? { ...app, status: action.payload.status }
            : app
        );
        toast.success("Application accepted successfully", {
          id: "application-update",
        });
      })
      .addCase(acceptApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error("Failed to accept application", {
          id: "application-update",
        });
      });

    // ---- Reject (Delete) ----
    builder
      .addCase(rejectApplication.pending, (state) => {
        state.loading = true;
        toast.loading("Deleting application...", { id: "application-update" });
      })
      .addCase(rejectApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.applications = state.applications.filter(
          (app) => app._id !== action.payload
        );
        toast.success("Application deleted successfully", {
          id: "application-update",
        });
      })
      .addCase(rejectApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error("Failed to delete application", {
          id: "application-update",
        });
      });
      //----DELETE----
      builder
    .addCase(deleteApplication.pending, (state) => {
      state.loading = true;
      toast.loading("Deleting application...", { id: "application-update" });
    })
    .addCase(deleteApplication.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.applications = state.applications.filter(
        (app) => app._id !== action.payload
      );
      toast.success("Application deleted successfully", {
        id: "application-update",
      });
    })
    .addCase(deleteApplication.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      toast.error("Failed to delete application", { id: "application-update" });
    });
  },
});

export default applicationSlice.reducer;

