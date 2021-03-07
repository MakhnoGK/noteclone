import { createSlice } from '@reduxjs/toolkit';
import { IAppState, SetDrawerAction } from '../types/appState';

const initialState: IAppState = {
  drawerOpened: true,
};

const appState = createSlice({
  initialState,
  name          : 'appState',
  reducers      : {
    setDrawerState(state, action: SetDrawerAction) {
      state.drawerOpened = action.payload;
    }
  },
});

export const { setDrawerState } = appState.actions;

export default appState.reducer;
