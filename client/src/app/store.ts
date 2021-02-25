import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import noteReducer from '../features/notes/noteSlice';
import usersReducer from '../features/users/usersSlice';
import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    HttpLink,
    NormalizedCacheObject,
} from '@apollo/client';
import { cache } from './cache';

const link = ApolloLink.from([
    new HttpLink({ uri: 'http://localhost:5000/graphql', credentials: 'include' }),
]);

export const apolloClient = new ApolloClient<NormalizedCacheObject>({
    link,
    cache,
});

export const store = configureStore({
    reducer: {
        notes: noteReducer,
        users: usersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
