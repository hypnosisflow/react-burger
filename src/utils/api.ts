import { getCookie, setCookie } from "./utils";
import { TForm } from "./types";

type TResponseBody<TDataKey extends string = "", TDataType = {}> = {
  [key in TDataKey]: TDataType;
} & {
  success: boolean;
  message?: string;
  headers?: Headers;
  readonly refreshToken: string;
  readonly accessToken: string;
};

interface CustomBody<T> extends Body {
  json(): Promise<T>;
}

export interface CustomResponse<T> extends CustomBody<T> {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly trailer?: Promise<Headers>;
  readonly type: ResponseType;
  readonly url: string;
  readonly refreshToken: string;
  readonly accessToken: string;
  readonly user: T;
  readonly message: string;
  readonly payload: T;
}

export type TTokenResponse = {
  payload: TForm;
  user: TForm;
  readonly refreshToken: string;
  readonly accessToken: string;
};

const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err: string) => Promise.reject(err));
};

function request(url: string, options: RequestInit) {
  return fetch(url, options).then(checkResponse);
}

export const BASE_URL: string = "https://norma.nomoreparties.space/api/";
export const WS_BASE_URL: string = "wss://norma.nomoreparties.space/orders";

export async function loadIngredients() {
  return await request(`${BASE_URL}ingredients`, { method: "GET" });
}

export async function makeOrder(ingredients: (string | undefined)[]) {
  return await request(`${BASE_URL}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    } as HeadersInit,
    body: JSON.stringify({ ingredients }),
  });
}

export async function orderHistoryRequest(orderNumber: number) {
  return await request(`${BASE_URL}orders/${orderNumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const register = async (
  form: TForm
): Promise<TResponseBody<"user", CustomResponse<TForm>>> => {
  return await request(`${BASE_URL}auth/register`, {
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

export const login = async (
  form: TForm
): Promise<TResponseBody<"user", CustomResponse<TTokenResponse>>> => {
  return await request(`${BASE_URL}auth/login`, {
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
  });
};

export const logout = async (): Promise<Response> => {
  return await request(`${BASE_URL}auth/logout`, {
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
};

export const editProfileRequest = async (
  form: TForm
): Promise<TResponseBody<"user", TForm>> => {
  return await request(`${BASE_URL}auth/user`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    } as HeadersInit,
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  });
};

export const getUserRequest = async (): Promise<TResponseBody<"user", TForm>> =>
  await request(`${BASE_URL}auth/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    } as HeadersInit,
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });

export const refreshToken = (): Promise<TResponseBody> => {
  return request(`${BASE_URL}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const fetchWithRefresh = async (
  url: string,
  options: RequestInit | any
): Promise<CustomResponse<TTokenResponse>> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if ((err as Error).message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const passwordResetRequest = async (
  form: TForm
): Promise<TResponseBody<"user", TForm>> => {
  return await request(`${BASE_URL}password-reset`, {
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
export const passwordReset = async (
  form: TForm
): Promise<TResponseBody<"user", TForm>> => {
  return await request(`${BASE_URL}password-reset/reset`, {
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
