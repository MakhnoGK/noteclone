import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../app/store';
import { RiQuillPenLine } from 'react-icons/ri';
import NoteList from '../../features/notes/NoteList';
import NoteEditor from '../../features/notes/NoteEditor';
import ActiveButton from '../elements/ActiveButton';
import Appbar from '../layout/Appbar';
import { gql, useMutation } from '@apollo/client';
import { noteCreated, noteSelected } from '../../features/notes/noteSlice';

const ADD_NOTE = gql`
  mutation addNote($title: String, $text: String) {
    addNote(title: $title, text: $text) {
      id
      title
      text
      userId
    }
  }
`;

export const EditorPage = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();
  const [addNote, { loading, error }] = useMutation(ADD_NOTE, {
    onCompleted: (data) => {
      dispatch(noteCreated(data.addNote));
      dispatch(noteSelected(data.addNote?.id));
    },
  });

  useEffect(() => {
    if (!isAuthenticated) history.push('/login');
  }, [isAuthenticated, history]);

  return (
    <>
      <div className="editor-container">
        <Appbar />

        <nav className="editor-nav">
          <ActiveButton
            active={loading}
            rounded={true}
            variant="primary"
            onClick={() =>
              addNote({
                variables: {
                  title: 'Blank note',
                  text: '',
                },
              })
            }
          >
            <RiQuillPenLine size={20} />
          </ActiveButton>
        </nav>

        <aside className="editor-list">
          <NoteList />
        </aside>

        <main className="editor-content">
          <NoteEditor />
        </main>
      </div>
    </>
  );
};
