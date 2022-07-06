import { TTokenBody, TCheckSuccess, TOrder, TIngredientsData } from "../services/types";

export const ROOT_API_URL = "https://norma.nomoreparties.space/api";
export const WS_URL = 'wss://norma.nomoreparties.space/orders/all';
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
export const expiresAT = new Date(Date.now() + 20 * 60 * 1000).toUTCString();
export const expiresRT = new Date(Date.now() + 20 * 60 * 100000).toUTCString();
export const setCookie = (name: string, value: string, expires: string) => (document.cookie = `${name}=${value};Expires=${expires}`);
export const getCookie = (name: string) => {
  const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const deleteCookie = (name: string) => (document.cookie = `${name}=;Expires=${new Date(0).toUTCString()}`);

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err: string) => Promise.reject(err));
};

const checkSuccess = <T>(data: TCheckSuccess<T>) => {
  if (data?.success) return data;
  else return Promise.reject(data);
};

export const getIngredients = async () => {
  const res = await fetch(ROOT_API_URL + "/ingredients");
  const data = await checkResponse(res);
  return (await checkSuccess<TIngredientsData>(data)).data;
};

export const createOrder = async (ingredientIds: Array<string>) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  requestHeaders.set("Accept", "application/json");
  requestHeaders.set("Authorization", getCookie("accessToken") ?? "");
  const res = await fetch(ROOT_API_URL + "/orders", {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify({
      ingredients: ingredientIds,
    }),
  });
  const data = await checkResponse(res);
  return await checkSuccess<TOrder>(data);
};

export const passwordReset = async (email: string) => {
  const res = await fetch(ROOT_API_URL + "/password-reset", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email: email,
    }),
  });
  const data = await checkResponse(res);
  return await checkSuccess(data);
};

export const setNewPassword = async (newPassword: string, token: string) => {
  const res = await fetch(ROOT_API_URL + "/password-reset/reset", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      password: newPassword,
      token: token,
    }),
  });
  const data = await checkResponse(res);
  return await checkSuccess(data);
};

export const registerUser = async (email: string, password: string, name: string) => {
  const res = await fetch(ROOT_API_URL + "/auth/register", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
  const data = await checkResponse(res);
  return await checkSuccess(data);
};

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(ROOT_API_URL + "/auth/login ", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  const data = await checkResponse(res);
  return await checkSuccess(data);
};

export const logoutUser = async (tokenBody: TTokenBody) => {
  const res = await fetch(ROOT_API_URL + "/auth/logout ", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(tokenBody),
  });
  const data = await checkResponse(res);
  return await checkSuccess(data);
};

export const getUser = () => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  requestHeaders.set("Accept", "application/json");
  requestHeaders.set("Authorization", getCookie("accessToken") ?? "");
  return fetchWithRefreshToken(ROOT_API_URL + "/auth/user", {
    method: "GET",
    headers: requestHeaders,
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
};

export const updateUser = (data: { name: string; email: string; password: string }) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  requestHeaders.set("Accept", "application/json");
  requestHeaders.set("Authorization", getCookie("accessToken") ?? "");
  return fetchWithRefreshToken(ROOT_API_URL + "/auth/user", {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(data),
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
};

export const updateToken = async () => {
  const res = await fetch(`${ROOT_API_URL}/auth/token`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  });
  return checkResponse(res);
};

const fetchWithRefreshToken = (url: string, options: RequestInit) => {
  return fetch(url, options)
    .then((res) => checkResponse(res))
    .catch((res) => {
      return res.json().then((err: { message: string }) => {
        if (err.message === "jwt expired") {
          return updateToken().then((res) => {
            setCookie("refreshToken", res.refreshToken, expiresRT);
            setCookie("accessToken", res.accessToken, expiresAT);
            if (options !== undefined) {
              (options.headers as { [key: string]: string }).Authorization = res.accessToken;
            }

            return fetch(url, options).then((res) => checkResponse(res));
          });
        } else {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          // eslint-disable-next-line
          location.reload();
          return Promise.reject(err);
        }
      });
    });
};

export const getOrder = async (number: string) => {
  const res = await  fetch(`${ROOT_API_URL}/orders/${number}`, {
    method: 'GET',
    headers: headers,
  });
  const data = await checkResponse(res);
  return await checkSuccess(data).orders[0];
};
