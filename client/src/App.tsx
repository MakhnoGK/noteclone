import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginPage } from './components/pages/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterPage } from './components/pages/RegisterPage';
import { EditorPage } from './components/pages/EditorPage';
import { RootState } from './app/store';
import { AppPreloader } from './components/layout/AppPreloader';
import { gql, useQuery } from '@apollo/client';
import { login } from './features/users/usersSlice';

const GET_ME = gql`
    query getMe {
        me {
            id
            username
            fullname
        }
    }
`;

function App() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state: RootState) => state.users);

    const { data: userData, loading: userLoading, error: userError } = useQuery(
        GET_ME
    );

    useEffect(() => {
        dispatch(login(userData?.me));
    }, [dispatch, userLoading]);

    return !isAuthenticated && userLoading ? (
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
