import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/dist/yup';
import { Controller, useForm } from 'react-hook-form/dist';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
  Link
} from '@material-ui/core';
import * as yup from 'yup';

import { RootState } from '../../app/store';
import {
  clearError,
  resetRegisterRequest
} from '../../features/users/usersSlice';
import { registerAsync } from '../../features/users/asyncFunctions';
import { useAuthStyles } from '../../styled';

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
  const { registerRequest, requestError } = useSelector(
    (state: RootState) => state.users
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useAuthStyles();

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

  const { handleSubmit, errors, control } = useForm<Inputs>({
    resolver: yupResolver(registerSchema)
  });

  return (
    <Box className={classes.root}>
      <Paper className={classes.formContainer}>
        <Typography variant="h3" className={classes.typography}>
          Registration
        </Typography>
        <Typography
          variant="subtitle2"
          className={classes.typography}
        >
          Create your new account to begin your work
        </Typography>
        <form onSubmit={handleSubmit(onRegister)}>
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
            <Controller
              name="fullname"
              control={control}
              defaultValue=""
              as={
                <TextField
                  id="fullname"
                  label="Display name (optional)"
                  type="text"
                  className={classes.textField}
                  error={Boolean(errors?.fullname)}
                />
              }
            />
            {errors?.password && (
              <Typography color="error">
                {errors?.fullname?.message}
              </Typography>
            )}
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={registerRequest === 'pending'}
            >
              Register
            </Button>{' '}
            or{' '}
            <Link
              component={RouterLink}
              to="/login"
              color="secondary"
            >
              Login
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
