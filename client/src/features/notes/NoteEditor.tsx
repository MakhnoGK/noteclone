import React, { useCallback, useRef } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentNote } from './noteSlice';
import { useNoteEditor } from '../../hooks/useNoteEditor';
import placeholderIcon from '../../assets/images/blank-document.svg';
import 'react-quill/dist/quill.snow.css';
import { saveNoteAsync } from './asyncFunctions';
import { debounce } from 'lodash';

const NoteEditor = () => {
    const currentNote = useSelector(selectCurrentNote);
    const dispatch = useDispatch();

    const [editorState, setEditorState, title, setTitle] = useNoteEditor();

    const saveNote = (title: string, text: string) => {
        dispatch(saveNoteAsync({ title, text }));
    };

    const saveCallback = useRef(debounce((title, text) => {
        saveNote(title, text);
    }, 1000)).current;

    // Hide editor if user doesnt have notes
    if (!currentNote)
        return (
            <div className="editor-placeholder">
                <img src={placeholderIcon} alt="Editor placeholder" />
            </div>
        );

    return (
        <>
            <input
                type="text"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                   {
                       setTitle(e.target.value)
                       saveCallback(e.target.value, editorState);
                   } 
                }
                className="editor-content__title"
            />

            <ReactQuill
                value={editorState}
                onChange={(value) => {
                    setEditorState(value)
                    saveCallback(title, value);
                }}
                style={{ flex: 1 }}
            />
        </>
    );
};

export default NoteEditor;
