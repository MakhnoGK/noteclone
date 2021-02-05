import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INoteState } from '../../@types/app';
import { RootState } from '../../app/store';
import { saveNoteAsync, fetchNotesAsync, addNoteAsync, deleteNoteAsync } from './asyncFunctions';

const initialState: INoteState = {
    notes: [],
    selected: 0,
    createState: 'idle',
    loadState: 'idle',
    deleteState: 'idle',
    updateState: 'idle',
    saveState: 'idle',
};

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        noteSelected(state, action: PayloadAction<number>) {
            state.selected = action.payload;
        },
        noteUpdated(
            { notes, selected },
            action: PayloadAction<{ title: string; text: string }>
        ) {
            const currentNote = notes.find((note) => note.id === selected);

            if (currentNote) {
                notes[notes.indexOf(currentNote)].title = action.payload.title;
                notes[notes.indexOf(currentNote)].text = action.payload.text;
            } else;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(saveNoteAsync.pending, (state, _) => {
            state.saveState = 'pending';
        });
        builder.addCase(saveNoteAsync.fulfilled, (state, _) => {
            state.saveState = 'fulfilled';
        })

        builder.addCase(fetchNotesAsync.pending, (state) => {
            state.loadState = 'pending';
        });
        builder.addCase(fetchNotesAsync.fulfilled, (state, { payload }) => {
            state.loadState = 'fulfilled';

            if (payload.length > 0) {
                state.notes = payload;
                state.selected = state.notes[0].id;
            }
        });

        builder.addCase(addNoteAsync.pending, (state) => {
            state.createState = 'pending';
        });
        builder.addCase(addNoteAsync.fulfilled, (state, { payload }) => {
            state.createState = 'fulfilled';
            state.notes.unshift(payload);
            state.selected = payload.id;
        });

        builder.addCase(deleteNoteAsync.pending, (state) => {
            state.deleteState = 'pending';
        });
        builder.addCase(deleteNoteAsync.fulfilled, (state, { payload }) => {
            state.deleteState = 'fulfilled';

            // get removed note id from action (actually resolved promise)
            const { id: noteId } = payload;

            // determine the index of removed note in state
            const noteIndex = state.notes.findIndex(
                (search) => search.id === noteId
            );

            const lastIndex = state.notes.length - 1;

            // determine wich note needs to become active (if top note remove - next, if bottom - top)
            if (noteIndex !== lastIndex)
                state.selected = state.notes[noteIndex + 1]?.id;
            else {
                state.selected = state.notes[noteIndex - 1]?.id;
            }

            // remove note from state
            state.notes = state.notes.filter((note) => note.id !== noteId);
        });
    },
});

export default noteSlice.reducer;
export const { noteSelected, noteUpdated } = noteSlice.actions;

export const selectNotes = (state: RootState) => state.notes.notes;
export const selectCurrentNote = (state: RootState) =>
    state.notes.notes.find((note) => note.id === state.notes.selected)
