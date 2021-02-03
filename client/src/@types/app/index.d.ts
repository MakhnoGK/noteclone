type RequestState = 'idle' | 'pending' | 'fulfilled' | 'rejected';

export interface INote {
    id: number;
    title: string;
    text: string;
}

export interface INoteState {
    notes: INote[];
    selected: number;
    loadState: RequestState;
    saveState: RequestState;
    updateState: RequestState;
    deleteState: RequestState; 
}
