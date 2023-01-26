import { getUserRequest } from "./../../utils/api";
import { TProfileActions } from "./profile";
import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_FAILED,
  REGISTER_REQUEST,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
} from "../constants/login";

import {
  BASE_URL,
  fetchWithRefresh,
  login,
  logout,
  refreshToken,
  register,
} from "../../utils/api";
import { setCookie, deleteCookie, getCookie } from "../../utils/utils";

import { TForm } from "../../utils/types";
import { AppThunk } from "../../utils/store-type";
import {
  AUTH_CHECKED,
  AUTH_FAILED,
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
} from "../constants/profile";

// login section
export type TLoginRequestAction = {
  readonly type: typeof LOGIN_REQUEST;
};

export type TLoginSuccessAction = {
  readonly type: typeof LOGIN_SUCCESS;
  readonly user?: TForm;
  readonly payload?: TForm;
};

export type TLoginFailedAction = {
  readonly type: typeof LOGIN_FAILED;
};

export type TLogoutAction = {
  readonly type: typeof LOGOUT;
};

export type TLogoutFailedAction = {
  readonly type: typeof LOGOUT_FAILED;
};

export type TRegisterAction = {
  readonly type: typeof REGISTER_REQUEST;
};

export type TRegisterSuccessAction = {
  readonly type: typeof REGISTER_SUCCESS;
  readonly user: TForm;
};

export type TRegisterFailedAction = {
  readonly type: typeof REGISTER_FAILED;
};

export type TLoginActions =
  | TLoginRequestAction
  | TLoginFailedAction
  | TLoginSuccessAction
  | TLogoutAction
  | TLogoutFailedAction
  | TRegisterAction
  | TRegisterFailedAction
  | TRegisterSuccessAction;

export const loginRequestAction = (): TLoginRequestAction => ({
  type: LOGIN_REQUEST,
});

export const loginFailedAction = (): TLoginFailedAction => ({
  type: LOGIN_FAILED,
});

export const logingSuccessAction = (user: TForm): TLoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  user,
});

export const logoutAction = (): TLogoutAction => ({
  type: LOGOUT,
});

export const registerAction = (): TRegisterAction => ({
  type: REGISTER_REQUEST,
});

export const registerSuccesAction = (user: TForm): TRegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  user,
});

export const registerFailedAction = (): TRegisterFailedAction => ({
  type: REGISTER_FAILED,
});

// auth section
export type TAuthCheckAction = {
  readonly type: typeof AUTH_CHECKED;
  readonly authChecked: boolean;
};

export type TAuthFailedAction = {
  readonly type: typeof AUTH_FAILED;
};

export const authCheckAction = (authChecked: boolean): TAuthCheckAction => ({
  type: AUTH_CHECKED,
  authChecked,
});

export const authFailedAcion = (): TAuthFailedAction => ({
  type: AUTH_FAILED,
});

// setting user section

export type TUserAction = {
  readonly type: typeof SET_USER_REQUEST;
};

export type TUserSuccessAction = {
  readonly type: typeof SET_USER_SUCCESS;
  readonly user: TForm;
};

export type TUserActions =
  | TUserAction
  | TUserSuccessAction
  | TAuthCheckAction
  | TAuthFailedAction;

export type TUserAuthActions = TUserActions | TLoginActions | TProfileActions;

export const setUserAction = (): TUserAction => ({
  type: SET_USER_REQUEST,
});

export const setUserSuccessAction = (user: TForm): TUserSuccessAction => ({
  type: SET_USER_SUCCESS,
  user,
});

// Logging

export const loginSend = (data: TForm): AppThunk => {
  return function (dispatch) {
    dispatch(loginRequestAction());
    login(data)
      .then((res) => {
        localStorage.setItem("refreshToken", res.refreshToken);
        setCookie("accessToken", res.accessToken);
        dispatch(logingSuccessAction(res.user));
      })
      .catch((error: string) => {
        console.log("Login Error", error);
      });
  };
};

function deleteTokens(): void {
  deleteCookie("accessToken");
  localStorage.clear();
}

export const logoutSend = (): AppThunk => {
  return function (dispatch) {
    logout()
      .then((res) => {
        deleteTokens();
        dispatch(logoutAction());
      })
      .catch((err) => {
        console.log("Logout Error", err);
      });
  };
};

export const registerSend = (data: TForm): AppThunk => {
  return function (dispatch) {
    dispatch(registerAction());
    register(data)
      .then((res) => {
        dispatch(registerSuccesAction(res.user));
      })
      .catch((err) => {
        dispatch(registerFailedAction());
      });
  };
};

// functions

export const checkUserAuth = (): AppThunk => (dispatch) => {
  if (getCookie("accessToken")) {
    dispatch(getUser())
      //@ts-ignore
      .finally(() => {
        dispatch({ type: AUTH_CHECKED, authChecked: true });
      })
      .catch((err: string) => {
        dispatch({ type: AUTH_FAILED, payload: err });
      });
  }
};

export interface ITokens {
  refreshToken: string;
  accessToken: string;
  res?: unknown;
}

export function saveTokens(tokens: ITokens): void {
  setCookie("accessToken", tokens.refreshToken);
  localStorage.setItem("refreshToken", tokens.accessToken);
  console.log("Tokens", tokens);
}

export const updateToken = (): AppThunk => {
  return function (dispatch) {
    refreshToken()
      .then((res) => {
        dispatch(setUserAction());
        console.log("Tokens updated");
      })
      .catch((err: {}) => {
        console.log("Token Update Error", err);
      });
  };
};

export const getUser = (): AppThunk => {
  return function (dispatch) {
    dispatch(setUserAction());
    return fetchWithRefresh(`${BASE_URL}auth/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("accessToken"),
      } as HeadersInit,
    })
      .then((res) => {
        dispatch(setUserSuccessAction(res.user));
      })
      .catch((error) => {
        console.log("Error get user", error);
      });
  };
};

console.log(getUser());
