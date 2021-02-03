import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import { fetchNotesAsync } from './features/notes/noteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterPage } from './components/RegisterPage';
import { EditorPage } from './components/EditorPage';
import { checkLoginAsync } from './features/users/usersSlice';
import { RootState } from './app/store';

function App() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        
        dispatch(checkLoginAsync());
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchNotesAsync());
        }
    }, [dispatch, isAuthenticated])

    return (
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