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
    createState: RequestState;
}

interface IAuthState {
    user: IUser | null;
    isAuthenticated: boolean;
    checkRequest: RequestState;
    loginRequest: RequestState;
    registerRequest: RequestState;
    logoutRequest: RequestState;
    requestError: string | null;
}

interface IUser {
    id: number;
    username: string;
    fullname: string;
}