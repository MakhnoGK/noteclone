import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from '../app/store';
import { clearError, registerAsync, resetRegisterRequest } from '../features/users/usersSlice';
import ActiveButton from './ActiveButton';
import { ErrorMessage } from './ErrorMessage';

interface IFormState {
    username: string | null;
    password: string | null;
    fullname: string | null;
    errors: IFormStateErrors;
}

interface IFormStateErrors {
    username: string;
    password: string;
}

export const RegisterPage = () => {
    const [form, setForm] = useState<IFormState>({
        username: null,
        password: null,
        fullname: null,
        errors: {
            username: '',
            password: '',
        },
    });

    const { registerRequest } = useSelector((state: RootState) => state.users);
    const history = useHistory();
    const dispatch = useDispatch();

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

    const register = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formValid()) {
            dispatch(
                registerAsync({
                    username: form.username,
                    password: form.password,
                    fullname: form.fullname,
                })
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

    useEffect(() => {
        dispatch(clearError);
    }, [dispatch]);

    useEffect(() => {
        if (registerRequest === 'fulfilled') {
            dispatch(resetRegisterRequest(null));
            history.push('/login');
        }
    }, [registerRequest, history, dispatch]);

    return (
        <div className="auth-container__outer">
            <div className="auth-container">
                <h1 className="auth-container__title">Welcome to Noteclone!</h1>
                <p className="auth-container__subtitle">
                    Please login or register to open editor
                </p>

                <form className="auth-form" onSubmit={register}>
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

                    <input
                        className="auth-form__input"
                        type="text"
                        placeholder="Display name"
                        name="fullname"
                        onChange={handleChange}
                    />

                    <ErrorMessage />

                    <div className="auth-form__action">
                        <ActiveButton
                            active={registerRequest === 'pending'}
                            variant="primary"
                        >
                            Register
                        </ActiveButton>
                        <span>or</span>
                        <Link to="/login" className="link link--primary">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
