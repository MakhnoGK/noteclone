import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../app/store';
import { RiQuillPenLine } from 'react-icons/ri';
import NoteList from '../../features/notes/NoteList';
import NoteEditor from '../../features/notes/NoteEditor';
import ActiveButton from '../elements/ActiveButton';
import Appbar from '../layout/Appbar';
import { addNoteAsync } from '../../features/notes/asyncFunctions';

export const EditorPage = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.users);
    const { createState } = useSelector((state: RootState) => state.notes);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!isAuthenticated) history.push('/login');
    }, [isAuthenticated, history]);

    return (
        <>
            <div className="editor-container">
                <Appbar />

                <nav className="editor-nav">
                    <ActiveButton
                        active={createState === 'pending'}
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
