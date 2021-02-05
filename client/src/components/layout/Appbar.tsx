import React from 'react';
import { BsTrashFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { deleteNoteAsync } from '../../features/notes/asyncFunctions';
import {
    selectCurrentNote,
} from '../../features/notes/noteSlice';
import { logoutAsync } from '../../features/users/asyncFunctions';
import ActiveButton from '../elements/ActiveButton';

const Navbar = () => {
    const { user } = useSelector((state: RootState) => state.users);
    const { selected, saveState, deleteState } = useSelector(
        (state: RootState) => state.notes
    );
    const currentNote = useSelector(selectCurrentNote);
    const dispatch = useDispatch();

    return (
        <header className="editor-header">
            <div className="note-actions">
                {currentNote && (
                    <>
                        <ActiveButton
                            active={deleteState === 'pending'}
                            rounded={true}
                            variant="danger"
                            onClick={() => dispatch(deleteNoteAsync(selected))}
                        >
                            <BsTrashFill size={20} />
                        </ActiveButton>

                        {saveState === 'pending' && (
                            <div className="note-actions__item">Saving...</div>
                        )}
                    </>
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
    );
};

export default Navbar;
