import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../features/users/usersSlice';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from '../../app/store';
import ActiveButton from '../elements/ActiveButton';
import { ErrorMessage } from '../elements/ErrorMessage';
import { useForm } from 'react-hook-form/dist';
import { yupResolver } from '@hookform/resolvers/dist/yup';
import * as yup from 'yup';
import { loginAsync } from '../../features/users/asyncFunctions';

type Inputs = {
    username: string;
    password: string;
};

const loginSchema = yup.object().shape({
    username: yup.string().required().min(3),
    password: yup.string().required().min(3),
});

export const LoginPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { isAuthenticated, loginRequest, requestError } = useSelector(
        (state: RootState) => state.users
    );

    useEffect(() => {
        dispatch(clearError(null));
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) history.push('/');
    }, [isAuthenticated, history]);

    const { register, handleSubmit, errors } = useForm<Inputs>({
        resolver: yupResolver(loginSchema),
    });

    const onLogin = (data: Inputs) => {
        dispatch(loginAsync(data));
    };

    return (
        <div className="auth-container__outer">
            <div className="auth-container">
                <h1 className="auth-container__title">Welcome to Noteclone!</h1>
                <p className="auth-container__subtitle">
                    Please login or register to open editor
                </p>

                <form className="auth-form" onSubmit={handleSubmit(onLogin)}>
                    <input
                        className={`auth-form__input ${
                            errors.username ? 'auth-form__input--error' : null
                        }`}
                        type="text"
                        placeholder="Username"
                        name="username"
                        ref={register}
                    />

                    {errors.username && (
                        <div className="auth-form__error">
                            {errors?.username?.message}
                        </div>
                    )}

                    <input
                        className={`auth-form__input ${
                            errors.password ? 'auth-form__input--error' : null
                        }`}
                        type="password"
                        placeholder="Password"
                        name="password"
                        ref={register}
                    />

                    {errors.password && (
                        <div className="auth-form__error">
                            {errors?.password?.message}
                        </div>
                    )}

                    <ErrorMessage message={requestError} variant="danger" />
                    
                    <div className="auth-form__action">
                        {' '}
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
