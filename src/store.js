import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './utils/authApi';
import { chatSocketApi } from './utils/chatSocketApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [chatSocketApi.reducerPath]: chatSocketApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, chatSocketApi.middleware),
});
