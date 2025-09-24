import { configureStore, combineReducers } from "@reduxjs/toolkit";
import mailSlice from "./features/mailSlice";
import authSlice from "./features/authSlice";
import jobSlice from "./features/jobSlice";
import taskSlice from "./features/taskSlice";
import sheetsSlice from "./features/sheetsSlice";
import applicationSlice from "./features/applicationSlice";

// 1. Explicitly combine all your individual slices into the main reducer
const appReducer = combineReducers({
  mail: mailSlice,
  auth: authSlice,
  job: jobSlice,
  task: taskSlice,
  sheet: sheetsSlice,
  applications: applicationSlice,
});

// 2. Create a root reducer that handles the state reset logic
const rootReducer: typeof appReducer = (state, action) => {
  // We are assuming the logout action type is 'auth/logout' 
  // based on Redux Toolkit naming conventions for a slice named 'auth' 
  // with a reducer function named 'logout'.
  if (action.type === 'auth/logout') {
    // When the logout action is dispatched, call appReducer with 'undefined' 
    // state to force all slices to return their initial state.
    return appReducer(undefined, action);
  }

  // For all other actions, proceed normally
  return appReducer(state, action);
};

// 3. Configure the store using the new rootReducer
export const store = configureStore({
  reducer: rootReducer,
});

// Types for TypeScript (remain the same)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;