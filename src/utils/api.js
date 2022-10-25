import { getCookie } from "./utils";
const BASE_URL = "https://norma.nomoreparties.space/api/";

export async function loadIngredients() {
  const res = await fetch(`${BASE_URL}ingredients`, { method: "GET" });
  return await res.json();
}

export async function makeOrder(ingredients) {
  const res = await fetch(`${BASE_URL}orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  });
  return await res.json();
}

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const register = async (form) => {
  return await fetch(" https://norma.nomoreparties.space/api/auth/register ", {
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

export const login = async (form) => {
  return await fetch("https://norma.nomoreparties.space/api/auth/login", {
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
  await fetch("https://norma.nomoreparties.space/api/auth/logout", {
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
  });

export const editProfileRequest = async (form) => {
  return await fetch("https://norma.nomoreparties.space/api/auth/user", {
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
  await fetch("https://norma.nomoreparties.space/api/auth/user", {
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
  await fetch("https://norma.nomoreparties.space/api/auth/token", {
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
  return await fetch("https://norma.nomoreparties.space/api/password-reset", {
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
  return await fetch(
    " https://norma.nomoreparties.space/api/password-reset/reset",
    {
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
    }
  ).then(checkResponse);
};
