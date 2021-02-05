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

        builder.addCase(checkLoginAsync.pending, (state, _) => {
            state.checkRequest = 'pending';
        });

        builder.addCase(checkLoginAsync.fulfilled, (state, action: any) => {
            if (action.payload) {
                state.user = action.payload.user;
                state.isAuthenticated = true;
            }

            state.checkRequest = 'fulfilled';
        });

        builder.addCase(loginAsync.pending, (state, _) => {
            state.loginRequest = 'pending';
        });

        builder.addCase(loginAsync.fulfilled, (state, action) => {
            if (!action.payload.error) {
                state.user = action.payload.user;
                state.isAuthenticated = true;
            } else {
                state.requestError = action.payload.error;
            }

            state.loginRequest = 'fulfilled';
        });

        builder.addCase(logoutAsync.fulfilled, (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
        });
    },
});

export const { clearError, resetRegisterRequest } = usersSlice.actions;

export default usersSlice.reducer;
