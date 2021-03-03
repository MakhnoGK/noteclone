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

export const EditorPage = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.users);
  const history             = useHistory();

  useEffect(() => {
    if (!isAuthenticated) history.push('/login');
  }, [isAuthenticated, history]);

  return (
    <>
      <Appbar />

      <NoteList />

      <Card style={{position:'fixed', top: 80, left: 250, right: 10, bottom: 10}}>
        <CardContent>
           <NoteEditor />
        </CardContent>
      </Card>
    </>
  );
};
