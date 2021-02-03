export const login = async (user: any) => {
    const response = await fetch('/api/auth/signin', {
        method: 'post',
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
};

export const checkLogin = async () => {
    const response = await fetch(`/api/auth/authenticated`, {
        method: 'get',
        credentials: 'include',
        mode: 'cors',
    });

    if (response.status === 401) return Promise.resolve(null);
    else return await response.json();
};

export const logout = async () => {
    const response = await fetch(`/api/auth/signout`, {
        credentials: 'include',
        mode: 'cors',
    });
    return await response.json();
};

export const register = async (user: any) => {
    const response = await fetch(`/api/auth/signup`, {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
};
