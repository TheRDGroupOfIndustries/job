

// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import mailSlice from "./features/mailSlice";
import authSlice from "./features/authSlice"

export const store = configureStore({
  reducer: {
    mail: mailSlice,
    auth: authSlice,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
