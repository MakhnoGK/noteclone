import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import { fetchNotesAsync } from './features/notes/noteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterPage } from './components/RegisterPage';
import { EditorPage } from './components/EditorPage';
import { checkLoginAsync } from './features/users/usersSlice';
import { RootState } from './app/store';
import { AppPreloader } from './components/AppPreloader';

function App() {
    const dispatch = useDispatch();
    const { isAuthenticated, checkRequest } = useSelector(
        (state: RootState) => state.users
    );

    useEffect(() => {
        dispatch(checkLoginAsync());
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchNotesAsync());
        }
    }, [dispatch, isAuthenticated]);

    return !isAuthenticated && checkRequest === 'pending' ? (
        <AppPreloader />
    ) : (
        <BrowserRouter>
            <div className="app">
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/" component={EditorPage} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
