import React                  from 'react';
import { useSelector }        from 'react-redux';
import sanitize               from 'sanitize-html';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar
} from '@material-ui/core';

import { Spinner }            from '../../components/elements/Spinner';

import { INote }              from '../../@types/app';
import { RootState }          from '../../app/store';
import { useNoteList }        from '../../hooks/useNoteList';
import { useNoteListStyles }  from '../../styled';


const NoteList = () => {
  const [notes, selected, setActive]  = useNoteList();
  const loadState                     = useSelector((state: RootState) => state.notes.loadState);
  const classes                       = useNoteListStyles();

  const renderNoteListItem = (note: INote) => {
    const sanitized       = sanitize(note.text, { allowedTags: ['p', 'br'] });
    const secondaryText   = (<span dangerouslySetInnerHTML={{ __html: sanitized }} />);

    return (
      <ListItem
        selected  = {note.id === selected}
        onClick   = {() => setActive(note.id)}
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

  return notes.length ? (
    <Drawer
      className = {classes.root}
      variant   = "permanent"
      anchor    = "left"
      classes   = {{ paper: classes.drawerPaper }}
      open
    >
      <Toolbar />

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
