import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { noteSelected } from '../features/notes/noteSlice';

export const useNoteList = () => {
    const dispatch = useDispatch();
    const { notes, selected } = useSelector((state: RootState) => state.notes);

    const setActive = (id: number) => {
        dispatch(noteSelected(id));
    };

    return [notes, selected, setActive] as const;
};
