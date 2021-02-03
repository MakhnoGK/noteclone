import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import noteReducer from '../features/notes/noteSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    notes: noteReducer,
    users: usersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
