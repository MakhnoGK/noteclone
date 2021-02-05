import { createAsyncThunk } from "@reduxjs/toolkit";
import { INote } from "../../@types/app";
import { addNote, deleteNote, fetchAllNotes, updateNote } from "../../api/notes";
import { RootState } from "../../app/store";

export const fetchNotesAsync = createAsyncThunk<INote[]>(
    'notes/fetch',
    async () => await fetchAllNotes()
);

export const addNoteAsync = createAsyncThunk<INote>(
    'notes/add',
    async () => await addNote()
);

export const deleteNoteAsync = createAsyncThunk<INote, number>(
    'notes/delete',
    async (noteId) => await deleteNote(noteId)
);

export const saveNoteAsync = createAsyncThunk<INote, {title: string, text: string}>(
    'notes/save',
    async (note, { getState }) => {
        const {
            notes: { selected },
        } = getState() as RootState;

        return await updateNote({ id: selected, ...note });
    }
);