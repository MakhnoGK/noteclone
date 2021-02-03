import React from 'react';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { saveNoteAsync, selectCurrentNote } from './noteSlice';
import { useNoteEditor } from '../../hooks/useNoteEditor';
import placeholderIcon from '../../assets/images/blank-document.svg';
import 'react-quill/dist/quill.snow.css';

const NoteEditor = () => {
    const currentNote = useSelector(selectCurrentNote);

    const dispatch = useDispatch();
    const [editorState, setEditorState, title, setTitle] = useNoteEditor();

    const saveNote = () => {
        dispatch(saveNoteAsync({ title, text: editorState }));
    };

    // Hide editor if user doesnt have notes
    if (!currentNote) return <div className="editor-placeholder">
        <img src={placeholderIcon} alt="Editor placeholder" />
    </div>

    return (
        <>
            <input
                type="text"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                onBlur={saveNote}
                className="editor-content__title"
            />

            <ReactQuill
                value={editorState}
                onChange={(value) => setEditorState(value)}
                onBlur={() =>
                    dispatch(saveNoteAsync({ title, text: editorState }))
                }
                style={{ flex: 1 }}
            />
        </>
    );
};

export default NoteEditor;
