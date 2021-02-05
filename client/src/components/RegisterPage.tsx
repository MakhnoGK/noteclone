import { yupResolver } from '@hookform/resolvers/dist/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form/dist';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from '../app/store';
import {
    clearError,
    registerAsync,
    resetRegisterRequest,
} from '../features/users/usersSlice';
import ActiveButton from './ActiveButton';
import { ErrorMessage } from './ErrorMessage';
import * as yup from 'yup';

interface Inputs {
    username: string;
    password: string;
    fullname: string;
}

const registerSchema = yup.object().shape({
    username: yup.string().required().min(3),
    password: yup.string().required().min(3)
});

export const RegisterPage = () => {
    const { registerRequest } = useSelector((state: RootState) => state.users);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearError);
    }, [dispatch]);

    useEffect(() => {
        if (registerRequest === 'fulfilled') {
            dispatch(resetRegisterRequest(null));
            history.push('/login');
        }
    }, [registerRequest, history, dispatch]);

    const onRegister = async (data: Inputs) => {
        dispatch(registerAsync(data));
    };

    const { register, handleSubmit, errors } = useForm<Inputs>({
        resolver: yupResolver(registerSchema),
    });

    return (
        <div className="auth-container__outer">
            <div className="auth-container">
                <h1 className="auth-container__title">Welcome to Noteclone!</h1>
                <p className="auth-container__subtitle">
                    Please login or register to open editor
                </p>

                <form className="auth-form" onSubmit={handleSubmit(onRegister)}>
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
                            {errors.username.message}
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
                            {errors.password.message}
                        </div>
                    )}

                    <input
                        className="auth-form__input"
                        type="text"
                        placeholder="Display name"
                        name="fullname"
                        ref={register}
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
