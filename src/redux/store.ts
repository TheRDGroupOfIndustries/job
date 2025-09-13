

// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import mailSlice from "./features/mailSlice";
import authSlice from "./features/authSlice"
import jobSlice from "./features/jobSlice";
import taskSlice from "./features/taskSlice";

export const store = configureStore({
  reducer: {
    mail: mailSlice,
    auth: authSlice,
    job: jobSlice,
    task: taskSlice,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
