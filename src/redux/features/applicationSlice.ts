import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


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
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const acceptApplication = createAsyncThunk(
    "applications/acceptApplication",
    async (applicationId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/user/applications/admin/accept/${applicationId}`, {
                method: "PATCH",
                credentials: "include",
            });
            if (!response.ok) {
                return rejectWithValue("Failed to accept application");
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const rejectApplication = createAsyncThunk(
    "applications/rejectApplication",
    async (applicationId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/user/applications/admin/reject/${applicationId}`, {
                method: "PATCH",
                credentials: "include",
            });
            if (!response.ok) {
                return rejectWithValue("Failed to reject application");
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)



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


export const applicationSlice = createSlice({
    name: "applications",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApplications.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.applications = action.payload.applications;
                console.log(state.applications);
            })
            .addCase(fetchApplications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(acceptApplication.pending, (state) => {
                state.loading = true;
                toast.loading("Updating Application...", { id: "application-update"});
            })
            .addCase(acceptApplication.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.applications = state.applications.map(app =>
                    app._id === action.payload.application._id ? { ...app, status: action.payload.application.status } : app
                );
                toast.success("Application accepted successfully", { id: "application-update"});
            })
            .addCase(acceptApplication.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        builder
            .addCase(rejectApplication.pending, (state) => {
                state.loading = true;
                toast.loading("Updating Application...", { id: "application-update"});
            })
            .addCase(rejectApplication.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.applications = state.applications.map(app =>
                    app._id === action.payload.application._id ? { ...app, status: action.payload.application.status } : app
                );
                toast.success("Application rejected successfully", { id: "application-update"});
            })
            .addCase(rejectApplication.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
})


export default applicationSlice.reducer;