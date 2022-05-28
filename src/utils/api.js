export const ROOT_API_URL = 'https://norma.nomoreparties.space/api';
const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
var expires = (new Date(Date.now() + 20 * 60 * 1000)).toUTCString();

export const setCookie = (name, value) =>
    document.cookie = `${name}=${value};Expires=${expires}`;
export const getCookie = (name) => {
    const matches = document.cookie.match(
        new RegExp(
            '(?:^|; )' +
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
            '=([^;]*)'
        )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const deleteCookie = (name) =>
    document.cookie = `${name}=;Expires=${new Date(0).toUTCString()}`;

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

const checkSuccess = (data) => {
    if (data?.success)
        return data;
    else
        return Promise.reject(data);
}

export const getIngredients = async () => {
    const res = await fetch(ROOT_API_URL + '/ingredients');
    const data = await checkResponse(res);
    return (await checkSuccess(data)).data;
}

export const createOrder = async (ingredientIds) => {
    const res = await fetch(ROOT_API_URL + "/orders", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "ingredients": ingredientIds
        })
    });
    const data = await checkResponse(res);
    return await checkSuccess(data);
}

export const passwordReset = async (email) => {
    const res = await fetch(ROOT_API_URL + "/password-reset", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "email": email
        })
    });
    const data = await checkResponse(res);
    return await checkSuccess(data);
}

export const setNewPassword = async (newPassword, token) => {
    const res = await fetch(ROOT_API_URL + "/password-reset/reset", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "password": newPassword,
            "token": token
        })
    });
    const data = await checkResponse(res);
    return await checkSuccess(data);
}

export const registerUser = async (email, password, name) => {
    const res = await fetch(ROOT_API_URL + "/auth/register", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "email": email,
            "password": password,
            "name": name
        })
    });
    const data = await checkResponse(res);
    return await checkSuccess(data);
}

export const loginUser = async (email, password) => {
    const res = await fetch(ROOT_API_URL + "/auth/login ", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    });
    const data = await checkResponse(res);
    return await checkSuccess(data);
}

export const logoutUser = async (tokenBody) => {
    const res = await fetch(ROOT_API_URL + "/auth/logout ", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(tokenBody)
    });
    const data = await checkResponse(res);
    return await checkSuccess(data);
}

export const getUser = () => {
    return fetchWithRefreshToken(ROOT_API_URL + "/auth/user", {
        method: 'GET',
        headers: {
            ...headers,
            Authorization: getCookie('accessToken'),
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    })
};


export const updateUser = (data) => {
    return fetchWithRefreshToken(ROOT_API_URL + "/auth/user", {
        method: 'PATCH',
        headers: {
            ...headers,
            Authorization: getCookie('accessToken'),
        },
        body: JSON.stringify(data),
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    })
};

export const updateToken = async () => {
    const res = await fetch(`${ROOT_API_URL}/auth/token`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    });
    return checkResponse(res);
};

const fetchWithRefreshToken = (url, options) => {
    return fetch(url, options).then((res) => checkResponse(res))
        .catch((res) => {
            return res.json()
                .then(err => {
                    if (err.message === 'jwt expired') {
                        return updateToken()
                            .then(res => {
                                localStorage.setItem('refreshToken', res.refreshToken);
                                const authToken = res.accessToken;
                                setCookie('accessToken', authToken);
                                options.headers.Authorization = res.accessToken;
                                return fetch(url, options).then((res) => checkResponse(res))
                            })
                    } else {
                        deleteCookie('accessToken');
                        localStorage.removeItem('refreshToken');
                        // eslint-disable-next-line
                        location.reload()
                        return Promise.reject(err)
                    }
                })
        })
}