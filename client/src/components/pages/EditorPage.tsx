import React, { useEffect }   from 'react';
import { useSelector }        from 'react-redux';
import { useHistory }         from 'react-router-dom';
import {
    Card,
    CardContent,
  } from '@material-ui/core';

import { RootState }          from '../../app/store';
import NoteEditor             from '../../features/notes/NoteEditor';
import NoteList               from '../../features/notes/NoteList';
import Appbar                 from '../layout/Appbar';
import { useEditorStyles }    from '../../styled';

export const EditorPage = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.users);
  const drawerState         = useSelector((state: RootState) => state.appState.drawerOpened);
  const history             = useHistory();
  const classes             = useEditorStyles({ drawerState });

  useEffect(() => {
    if (!isAuthenticated) history.push('/login');
  }, [isAuthenticated, history]);

  return (
    <>
      <Appbar />

      <NoteList />

      <Card className={classes.root}>
        <CardContent className={classes.editorContent}>
           <NoteEditor />
        </CardContent>
      </Card>
    </>
  );
};
