import React                              from 'react';
import { useDispatch, useSelector }       from 'react-redux';
import sanitize                           from 'sanitize-html';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar
}                                         from '@material-ui/core';
import { ChevronLeft as ChevronLeftIcon } from '@material-ui/icons';

import { Spinner }                        from '../../components/elements/Spinner';

import { INote }                          from '../../@types/app';
import { RootState }                      from '../../app/store';
import { useNoteList }                    from '../../hooks/useNoteList';
import { useNoteListStyles }              from '../../styled';
import { setDrawerState }                 from '../../redux/features/appState';


const NoteList = () => {
  const [notes, selected, setActive]  = useNoteList();
  const drawerState                   = useSelector((state: RootState) => state.appState.drawerOpened);
  const loadState                     = useSelector((state: RootState) => state.notes.loadState);
  const dispatch                      = useDispatch();
  const classes                       = useNoteListStyles();

  const renderNoteListItem = (note: INote) => {
    const sanitized       = sanitize(note.text, { allowedTags: ['p', 'br'] });
    const secondaryText   = (<span dangerouslySetInnerHTML={{ __html: sanitized }} />);

    return (
      <ListItem
        selected  = {note.id === selected}
        onClick   = {() => setActive(note.id)}
        key       = {note.id}
        button
      >
        <ListItemText
          primary   = {note.title}
          secondary = {secondaryText}
        />
      </ListItem>
    );
  };

  const renderNoteList = () => {
    return <List>{notes.map(renderNoteListItem)}</List>;
  };

  const renderSpinner = () => {
    if (loadState !== 'pending') return null;

    return (
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Spinner className="note-list__loader-icon" size={32} />
      </div>
    )
  }

  const handleDrawerClose = () => {
    dispatch(setDrawerState(!drawerState));
  }

  return notes.length ? (
    <Drawer
      className = {classes.root}
      variant   = 'persistent'
      anchor    = 'left'
      classes   = {{ paper: classes.drawerPaper }}
      open      = {drawerState}
    >
      <Toolbar />

      <div style={{display: 'flex', justifyContent:'flex-end'}}>
        <IconButton onClick={handleDrawerClose} style={{margin: '10px 10px 0 0'}}>
          <ChevronLeftIcon />
        </IconButton>
      </div>

      {renderSpinner()}
      {renderNoteList()}
    </Drawer>
  ) : (
    <span className="note-list__message">
      You don't create any notes so far
    </span>
  );
};

export default NoteList;
