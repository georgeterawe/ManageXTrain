import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import layoutReducer from '../features/layoutSlice';
import { checkTokenExpiration } from '../middleware/checkTokenExpiration'; // Import the middleware

const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(checkTokenExpiration),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
