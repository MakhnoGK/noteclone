import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form/dist';
import { yupResolver } from '@hookform/resolvers/dist/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
  Link
} from '@material-ui/core';

import { RootState } from '../../app/store';
import { clearError } from '../../features/users/usersSlice';
import { loginAsync } from '../../features/users/asyncFunctions';
import { useAuthStyles } from '../../styled';

type Inputs = {
  username: string;
  password: string;
};

const loginSchema = yup.object().shape({
  username: yup.string().required().min(3),
  password: yup.string().required().min(3)
});

export const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated, loginRequest, requestError } = useSelector(
    (state: RootState) => state.users
  );
  const classes = useAuthStyles();
  const { control, handleSubmit, errors } = useForm<Inputs>({
    resolver: yupResolver(loginSchema)
  });

  useEffect(() => {
    dispatch(clearError(null));
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) history.push('/');
  }, [isAuthenticated, history]);

  const onLogin = (data: Inputs) => {
    dispatch(loginAsync(data));
  };

  return (
    <Box className={classes.root}>
      <Paper className={classes.formContainer}>
        <Typography variant="h3" className={classes.typography}>
          Login
        </Typography>
        <Typography
          variant="subtitle2"
          className={classes.typography}
        >
          Sign in with your username and password to start working
          with notes
        </Typography>
        <form onSubmit={handleSubmit(onLogin)}>
          <FormControl className={classes.formControl}>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              as={
                <TextField
                  id="email"
                  label="Username"
                  className={classes.textField}
                  error={Boolean(errors?.username)}
                />
              }
            />
            {errors?.username && (
              <Typography color="error">
                {errors?.username?.message}
              </Typography>
            )}
          </FormControl>
          <FormControl className={classes.formControl}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              as={
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  className={classes.textField}
                  error={Boolean(errors?.password)}
                />
              }
            />
            {errors?.password && (
              <Typography color="error">
                {errors?.password?.message}
              </Typography>
            )}
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={loginRequest === 'pending'}
            >
              Log In
            </Button>{' '}
            or{' '}
            <Link
              component={RouterLink}
              to="/register"
              color="secondary"
            >
              Register
            </Link>
          </FormControl>
        </form>
        {requestError && (
          <Typography color="error">{requestError}</Typography>
        )}
      </Paper>
    </Box>
  );
};
