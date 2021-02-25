import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import sanitize from 'sanitize-html';
import { RootState } from '../../app/store';
import { Spinner } from '../../components/elements/Spinner';
import NoteListItem from './NoteListItem';
import { noteSelected, notesLoaded } from './noteSlice';

const GET_NOTES = gql`
  query getNotes {
    notes {
      id
      title
      text
    }
  }
`;

const NoteList = () => {
  const {
    data: notesData,
    loading: notesLoading,
    error: notesError,
  } = useQuery(GET_NOTES);
  const { notes, selected } = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notesData && notesData.notes) {
      dispatch(notesLoaded(notesData.notes));
      dispatch(noteSelected(notesData.notes[0]?.id));
    }
  }, [notesData]);

  return notesLoading ? (
    <div style={{ textAlign: 'center', marginTop: 24 }}>
      <Spinner className="note-list__loader-icon" size={32} />
    </div>
  ) : notes.length > 0 ? (
    <Scrollbars
      className="note-list"
      renderThumbVertical={(props) => (
        <div {...props} className="note-list__thumb-vertical" />
      )}
    >
      {notes.map((note: any) => (
        <NoteListItem
          key={note.id}
          note={note}
          selected={selected === note.id}
        />
      ))}
    </Scrollbars>
  ) : (
    <span className="note-list__message">
      You don't create any notes so far
    </span>
  );
};

export default NoteList;
