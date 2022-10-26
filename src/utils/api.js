import { getCookie } from "./utils";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const BASE_URL = "https://norma.nomoreparties.space/api/";

export async function loadIngredients() {
  return await fetch(`${BASE_URL}ingredients`, { method: "GET" }).then(checkResponse);
}

export async function makeOrder(ingredients) {
  return await fetch(`${BASE_URL}orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  }).then(checkResponse);
}

export const register = async (form) => {
  return await fetch(`${BASE_URL}auth/register `, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  }).then(checkResponse)
};

export const login = async (form) => {
  return await fetch(`${BASE_URL}auth/login`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  }).then(checkResponse);
};

export const logout = async () =>
  await fetch(`${BASE_URL}auth/logout`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }).then(checkResponse)
  });

export const editProfileRequest = async (form) => {
  return await fetch(`${BASE_URL}auth/user`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  }).then(checkResponse);
};

export const getUserRequest = async () =>
  await fetch(`${BASE_URL}auth/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).then(checkResponse);

export const tokenUpdate = async () =>
  await fetch(`${BASE_URL}auth/token`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);

export const passwordResetRequest = async (form) => {
  return await fetch(`${BASE_URL}reset-password`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  });
};

export const passwordReset = async (form) => {
  return await fetch(`${BASE_URL}password-reset/reset`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  }).then(checkResponse);
};
