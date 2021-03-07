import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import noteReducer from '../features/notes/noteSlice';
import usersReducer from '../features/users/usersSlice';
import appStateReducer from '../redux/features/appState';

export const store = configureStore({
  reducer: {
    notes: noteReducer,
    users: usersReducer,
    appState: appStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
