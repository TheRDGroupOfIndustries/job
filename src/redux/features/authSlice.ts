import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userData: {
    id: string;
    email: string;
    role: string;
    name: string;
  } | null;
  isAutheticated: boolean;
  loading: boolean;
}

export const fetchUser = createAsyncThunk("user/fetchUser", async (_, { rejectWithValue }) => {
  const res = await fetch("/api/auth/me", { credentials: "include" });
  const data = await res.json();

  if (!data.user) {
    return rejectWithValue("Unauthorized");
  }
  return data.user;
});

const initialState: AuthState = {
  userData: null,
  isAutheticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin: (state, action: PayloadAction<any>) => {
      state.userData = action.payload.user;
      state.isAutheticated = true;
    },
    authLogout: (state) => {
      state.userData = null;
      state.isAutheticated = false;
    },
    decodeToken: (state, action: PayloadAction<any>) => {
      const token = action.payload;
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log(payload);
      state.userData = payload;
      state.isAutheticated = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { authLogin, authLogout } = authSlice.actions;
export default authSlice.reducer;
