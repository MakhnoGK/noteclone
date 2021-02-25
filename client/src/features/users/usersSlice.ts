import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from '../../@types/app';
import {
    registerAsync,
    checkLoginAsync,
    loginAsync,
    logoutAsync,
} from './asyncFunctions';

const initialState: IAuthState = {
    user: null,
    isAuthenticated: false,
    checkRequest: 'idle',
    loginRequest: 'idle',
    registerRequest: 'idle',
    logoutRequest: 'idle',
    requestError: null,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearError(state, _) {
            state.requestError = null;
        },
        resetRegisterRequest(state, _) {
            state.registerRequest = 'idle';
        },
        login(state, action) {
            if (action.payload) {
                state.user = action.payload;
                state.isAuthenticated = true;
            }
        },
        logout(state, _) {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers(builder) {
        builder.addCase(registerAsync.pending, (state, _) => {
            state.registerRequest = 'pending';
        });

        builder.addCase(registerAsync.fulfilled, (state, action: any) => {
            if (action.payload.error) {
                state.requestError = action.payload.error;
                state.registerRequest = 'idle';
                return;
            }

            state.registerRequest = 'fulfilled';
        });

        builder.addCase(logoutAsync.fulfilled, (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
        });
    },
});

export const { login, logout, clearError, resetRegisterRequest } = usersSlice.actions;

export default usersSlice.reducer;
