import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginPage } from './components/pages/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterPage } from './components/pages/RegisterPage';
import { EditorPage } from './components/pages/EditorPage';
import { RootState } from './app/store';
import { AppPreloader } from './components/layout/AppPreloader';
import { checkLoginAsync } from './features/users/asyncFunctions';
import { fetchNotesAsync } from './features/notes/asyncFunctions';

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

    return !isAuthenticated &&
        checkRequest !== 'fulfilled' ? (
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
