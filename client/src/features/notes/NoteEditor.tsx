import { useDispatch, useSelector }   from 'react-redux';
import React, { useRef }              from 'react';
import { debounce }                   from 'lodash';
import ReactQuill                     from 'react-quill';

import { RootState }                  from '../../app/store';
import { selectCurrentNote }          from './noteSlice';
import { saveNoteAsync }              from './asyncFunctions';
import placeholderIcon                from '../../assets/images/blank-document.svg';
import { useNoteEditor }              from '../../hooks/useNoteEditor';
import { useEditorStyles }            from '../../styled';

import 'react-quill/dist/quill.snow.css';

const NoteEditor = () => {
    const [
      editorState,
      setEditorState,
      title,
      setTitle
    ]                 = useNoteEditor();
    const currentNote = useSelector(selectCurrentNote);
    const drawerState = useSelector((state: RootState) => state.appState.drawerOpened);
    const dispatch    = useDispatch();
    const classes     = useEditorStyles({ drawerState });

    const saveNote = (title: string, text: string) => {
        dispatch(saveNoteAsync({ title, text }));
    };

    const saveCallback = useRef(debounce((title, text) => {
        saveNote(title, text);
    }, 1000)).current;

    // Hide editor if user doesnt have notes
    if (!currentNote) {
        return (
            <div className="editor-placeholder">
                <img src={placeholderIcon} alt="Editor placeholder" />
            </div>
        );
    }

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
                className={classes.editorContent}
            />
        </>
    );
};

export default NoteEditor;
