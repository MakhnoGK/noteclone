import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../@types/app";
import { register, login, checkLogin, logout } from "../../api/users";

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