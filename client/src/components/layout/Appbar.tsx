import React                        from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from '@material-ui/core';

import { RootState }                from '../../app/store';
import { addNoteAsync }             from '../../features/notes/asyncFunctions';
import { logoutAsync }              from '../../features/users/asyncFunctions';
import { useAppbarStyles }          from '../../styled';


const Navbar = () => {
  const classes  = useAppbarStyles();
  const user     = useSelector((state: RootState) => state.users.user);
  const dispatch = useDispatch();

  const handleCreateNote = () => {
    dispatch(addNoteAsync());
  }

  const handleUserLogout = () => {
    dispatch(logoutAsync());
  }

  const renderCreateButton = () => {
    return (
      <Button
        variant = "contained"
        color   = "primary"
        onClick = {handleCreateNote}
      >
        Create note
      </Button>
    )
  }

  const renderUserArea = () => {
    return (
      <Box className={classes.userArea}>
        <Typography component="strong">{user?.fullname}</Typography>
        <Button
          color     = "primary"
          className = {classes.logoutBtn}
          onClick   = {handleUserLogout}
        >
          Logout
        </Button>
      </Box>
    )
  }

  return (
    <AppBar position="fixed" className={classes.appbar}>
      <Toolbar>
        {renderCreateButton()}
        {renderUserArea()}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
