import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { noteUpdated } from '../features/notes/noteSlice';

export const useNoteEditor = () => {
    const { selected, notes } = useSelector((state: RootState) => state.notes);
    const dispatch = useDispatch();

    const [editorState, setEditorState] = useState('');
    const [title, setTitle] = useState('');

    useMemo(() => {
        const selectedNote = notes.find((note) => note.id === selected);

        if (selectedNote) {
            setEditorState(selectedNote.text);
            setTitle(selectedNote.title);
        } else;
    }, [selected, notes]);

    useEffect(() => {
        dispatch(noteUpdated({ title, text: editorState }));
    }, [editorState, title, dispatch]);

    return [editorState, setEditorState, title, setTitle] as const;
};
