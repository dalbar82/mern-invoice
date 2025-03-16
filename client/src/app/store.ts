import { configureStore } from '@reduxjs/toolkit';
import { baseApiSlice } from '../features/api/baseApiSlice';
import authReducer from '../features/auth/authSlice';

// Configure Redux store
export const store = configureStore({
  reducer: {
    [baseApiSlice.reducerPath]: baseApiSlice.reducer, 
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production', 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
