import React                        from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Button,
  Box
}                                   from '@material-ui/core';
import { Menu as MenuIcon }         from '@material-ui/icons';

import { RootState }                from '../../app/store';
import { addNoteAsync }             from '../../features/notes/asyncFunctions';
import { logoutAsync }              from '../../features/users/asyncFunctions';
import { useAppbarStyles }          from '../../styled';
import { setDrawerState }           from '../../redux/features/appState';


const Navbar = () => {
  const dispatch      = useDispatch();
  const classes       = useAppbarStyles();
  const user          = useSelector((state: RootState) => state.users.user);
  const drawerState   = useSelector((state: RootState) => state.appState.drawerOpened);

  const handleToggleDrawerState = () => {
    dispatch(setDrawerState(!drawerState));
  }

  const handleCreateNote = async () => {
    dispatch(setDrawerState(true));
    dispatch(await addNoteAsync());
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
        <Typography component="strong">
          {user?.fullname}
        </Typography>
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
    <AppBar
      position  = "fixed"
      className = {classes.appbar}
    >
      <Toolbar>
        <IconButton
          onClick   = {handleToggleDrawerState}
          className = {classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        {renderCreateButton()}
        {renderUserArea()}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
