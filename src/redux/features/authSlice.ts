import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

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

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const data = await res.json();
      // console.log("auth-response: ", data)

      if (data.success === false ) {
        return rejectWithValue("Unauthorized");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (
    {
      email,
      password,
      name,
      role,
      phone,
    }: {
      email: string;
      password: string;
      name: string;
      role: string;
      phone?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, role, phone }),
      });
      const data = await res.json();
      if (!data.success) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const verifyUser = createAsyncThunk(
  "user/verifyUser",
  async (
    {
      email,
      otp,
    }: {
      email: string;
      otp: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!data.success) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
    },
  },
  extraReducers: (builder) => {
    // Fetch User
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAutheticated = true;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
      });

    // Login User
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        toast.loading("Logging in...", { id: "login" });
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAutheticated = true;
        toast.success("Logged in successfully", { id: "login" });
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        toast.error(action.payload, { id: "login" });
      });

    // register User
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        toast.loading("Registering...", { id: "register" });
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAutheticated = true;
        toast.success(action.payload.message, { id: "register" });
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        toast.error(action.payload, { id: "register" });
      })

    // register User
    builder
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
        toast.loading("Verifying...", { id: "verify" });
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAutheticated = true;
        toast.success(action.payload.message, { id: "verify" });
      })
      .addCase(verifyUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        toast.error(action.payload, { id: "verify" });
      })
  },
});

export const { authLogin, authLogout } = authSlice.actions;
export default authSlice.reducer;
