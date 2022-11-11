import { getCookie } from "./utils";
import { TRes, TForm } from "./types";

// Мне кажется, что я что-то упускаю, упрощаю типизацию, пропуская важные моменты (не понимаю пока суть дженериков видимо)))

const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err: any) => Promise.reject(err));
};

const BASE_URL: string = "https://norma.nomoreparties.space/api/";

// ? нужна тут типизация?
export async function loadIngredients() {
  return await fetch(`${BASE_URL}ingredients`, { method: "GET" }).then(
    checkResponse
  );
}

export async function makeOrder(ingredients: any) {
  return await fetch(`${BASE_URL}orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  }).then(checkResponse);
}

export const register = async (form: TForm) => {
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
  }).then(checkResponse);
};

export const login = async (form: TForm) => {
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
      // @ts-ignore
      // then тут выдает ошибку - не существует в string(откуда она идет?)
    }).then(checkResponse),
  });


// пытался вывести тип для headers 96стр. 
type THead = {
  "Content-Type": string;
  Authorization: string | undefined;
};

const head: THead = {
  "Content-Type": "application/json",
  Authorization: getCookie("accessToken"),
};

export const editProfileRequest = async (form: TForm) => {
  return await fetch(`${BASE_URL}auth/user`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    //@ts-ignore 
    // headers тут ругается - не может для типа HeadersInit|undefined? и веде внизу? чего  тут надо доюиться?
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
    // @ts-ignore
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

export const passwordResetRequest = async (form: TForm) => {
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

export const passwordReset = async (form: TForm) => {
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
