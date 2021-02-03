import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestState } from '../../@types/app';
import { checkLogin, login, logout, register } from '../../api/users';

interface IAuthState {
    user: IUser | null;
    isAuthenticated: boolean;
    loginRequest: RequestState;
    registerRequest: RequestState;
    logoutRequest: RequestState;
    requestError: string | null;
}

interface IUser {
    id: number;
    username: string;
    fullname: string;
}

const initialState: IAuthState = {
    user: null,
    isAuthenticated: false,
    loginRequest: 'idle',
    registerRequest: 'idle',
    logoutRequest: 'idle',
    requestError: null,
};

export const registerAsync = createAsyncThunk<IUser, any>(
    'register',
    async (user: any) => register(user)
);

export const loginAsync = createAsyncThunk<any, any>('login', async (user) =>
    login(user)
);

export const checkLoginAsync = createAsyncThunk<IUser | null>(
    'checkAuth',
    async () => checkLogin()
);

export const logoutAsync = createAsyncThunk('logout', async () => logout());

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearError(state, _) {
            state.requestError = null;
        },
    },
    extraReducers(builder) {
        builder.addCase(registerAsync.pending, (state, _) => {
            state.registerRequest = 'pending';
        });

        builder.addCase(registerAsync.fulfilled, (state, action: any) => {
            state.registerRequest = 'fulfilled';

            if (action.payload.error) {
                state.requestError = action.payload.error;
            }
        });

        builder.addCase(checkLoginAsync.fulfilled, (state, action: any) => {
            if (action.payload) {
                state.user = action.payload.user;
                state.isAuthenticated = true;
            }
        });

        builder.addCase(loginAsync.pending, (state, _) => {
            state.loginRequest = 'pending';
        })

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

export const { clearError } = usersSlice.actions;

export default usersSlice.reducer;
