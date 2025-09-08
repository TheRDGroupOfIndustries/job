import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userData: {
    id: string;
    email: string;
    role: string;
    name: string;
  } | null;
  isAutheticated: boolean;
}

const initialState: AuthState = {
  userData: null,
  isAutheticated: false,
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
  },
});

export const { authLogin, authLogout } = authSlice.actions;
export default authSlice.reducer;
