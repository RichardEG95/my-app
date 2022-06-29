import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { commentsApi } from '../features/comments/commentsApi';

const store = configureStore({
  reducer: {
    [commentsApi.reducerPath]: commentsApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([commentsApi.middleware])
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

export function createTestStore(): EnhancedStore {
  return configureStore({
    reducer: {
      [commentsApi.reducerPath]: commentsApi.reducer
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat([commentsApi.middleware])
  });
}
