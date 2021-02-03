import { INote } from '../@types/app';
import noteTemplate from '../assets/noteTemplate.json';

export const fetchAllNotes = async (): Promise<INote[]> => {
    const response = await fetch('/api/notes', {
        credentials: 'include',
    });
    const data = await response.json();

    return data;
};

export const addNote = async (): Promise<INote> => {
    try {
        const response = await fetch(`/api/notes`, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteTemplate),
        });

        return await response.json();
    } catch (error) {
        throw new Error(error);
    }
};

export const updateNote = async (input: INote): Promise<INote> => {
    const response = await fetch(`/api/notes/${input.id}`, {
        method: 'put',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...input }),
    });

    const data = await response.json();

    return data;
};

export const deleteNote = async (id: number): Promise<INote> => {
    const response = await fetch(`/api/notes/${id}`, {
        method: 'delete',
        credentials: 'include',
    });
    const result = await response.json();
    return result;
};
