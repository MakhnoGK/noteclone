import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../app/store';
import { RiQuillPenLine } from 'react-icons/ri';
import { BsTrashFill } from 'react-icons/bs';
import NoteList from '../features/notes/NoteList';
import {
    addNoteAsync,
    deleteNoteAsync,
    selectCurrentNote,
} from '../features/notes/noteSlice';
import NoteEditor from '../features/notes/NoteEditor';
import ActiveButton from './ActiveButton';
import { logoutAsync } from '../features/users/usersSlice';

export const EditorPage = () => {
    const { isAuthenticated, user } = useSelector(
        (state: RootState) => state.users
    );
    const { selected, saveState, deleteState } = useSelector(
        (state: RootState) => state.notes
    );
    const currentNote = useSelector(selectCurrentNote);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!isAuthenticated) history.push('/login');
    }, [isAuthenticated, history]);

    return (
        <>
            <div className="editor-container">
                <header className="editor-header">
                    <div className="note-actions">
                        {currentNote && (
                            <ActiveButton
                                active={deleteState === 'pending'}
                                rounded={true}
                                variant="danger"
                                onClick={() =>
                                    dispatch(deleteNoteAsync(selected))
                                }
                            >
                                <BsTrashFill size={20} />
                            </ActiveButton>
                        )}
                    </div>
                    <div className="user">
                        <p className="user__greeting">
                            Welcome, <strong>{user?.fullname}</strong>!
                        </p>

                        <a
                            href="/"
                            className="user__action link link--primary"
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(logoutAsync());
                            }}
                        >
                            Logout
                        </a>
                    </div>
                </header>
                <nav className="editor-nav">
                    <ActiveButton
                        active={saveState === 'pending'}
                        rounded={true}
                        variant="primary"
                        onClick={() => dispatch(addNoteAsync())}
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
