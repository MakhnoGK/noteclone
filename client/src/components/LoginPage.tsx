import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loginAsync } from '../features/users/usersSlice';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from '../app/store';
import ActiveButton from './ActiveButton';
import { ErrorMessage } from './ErrorMessage';
import '../styles/auth-form.scss';

interface IFormState {
    username: string | null;
    password: string | null;
    errors: IFormStateErrors;
}

interface IFormStateErrors {
    username: string;
    password: string;
}

export const LoginPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { isAuthenticated, loginRequest } = useSelector(
        (state: RootState) => state.users
    );
    const [form, setForm] = useState<IFormState>({
        username: null,
        password: null,
        errors: {
            username: '',
            password: '',
        },
    });

    useEffect(() => {
        dispatch(clearError(null))
    }, [dispatch])

    useEffect(() => {
        if (isAuthenticated) history.push('/');
    }, [isAuthenticated, history]);

    const formValid = () => {
        let valid = true;

        Object.values(form.errors).forEach(
            (field) => field.length > 0 && (valid = false)
        );

        // Check if form is filled
        form.username === null && (valid = false);
        form.password === null && (valid = false);

        return valid;
    };

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formValid()) {
            dispatch(
                loginAsync({ username: form.username, password: form.password })
            );
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value, name },
        } = e;

        let { errors } = form;

        switch (name) {
            case 'username':
                errors.username =
                    value.length < 3
                        ? 'Username is required and must be at least 3 characters long.'
                        : '';
                break;
            case 'password':
                errors.password =
                    value.length < 3
                        ? 'Password is required and must be at least 3 characters long.'
                        : '';
                break;
            default:
                break;
        }

        setForm((state: any) => ({ ...state, [name]: value, errors }));
    };

    return (
        <div className="auth-container__outer">
            <div className="auth-container">
                <h1 className="auth-container__title">Welcome to Noteclone!</h1>
                <p className="auth-container__subtitle">
                    Please login or register to open editor
                </p>

                <form className="auth-form" onSubmit={handleLogin}>
                    <input
                        className={`auth-form__input ${
                            form.errors.username.length > 0
                                ? 'auth-form__input--error'
                                : null
                        }`}
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={handleChange}
                    />

                    {form.errors.username.length > 0 && (
                        <div className="auth-form__error">
                            {form.errors.username}
                        </div>
                    )}

                    <input
                        className={`auth-form__input ${
                            form.errors.password.length > 0
                                ? 'auth-form__input--error'
                                : null
                        }`}
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                    />

                    {form.errors.password.length > 0 && (
                        <div className="auth-form__error">
                            {form.errors.password}
                        </div>
                    )}
                    <ErrorMessage />
                    <div className="auth-form__action">
                        <ActiveButton
                            active={loginRequest === 'pending'}
                            variant="primary"
                            type="submit"
                        >
                            Login
                        </ActiveButton>
                        <span>or</span>
                        <Link to="/register" className="link link--primary">
                            Create new account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
