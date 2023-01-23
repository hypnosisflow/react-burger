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

import { login, logout, register } from "../../utils/api";
import { setCookie, deleteCookie } from "../../utils/utils";

import { TForm } from "../../utils/types";
import { AppThunk } from "../../utils/store-type";

// login section
export type TLoginRequestAction = {
  readonly type: typeof LOGIN_REQUEST;
};

export type TLoginSuccessAction = {
  readonly type: typeof LOGIN_SUCCESS;
  readonly user?: TForm;
  readonly accessToken?: string;
  readonly refreshToken?: string;
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
  readonly payload?: TForm;
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

export const logingSuccessAction = (
  user: TForm,
  accessToken: string,
  refreshToken: string
): TLoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  user,
  accessToken,
  refreshToken,
});

export const logoutAction = (): TLogoutAction => ({
  type: LOGOUT,
});

export const logoutFailedAction = (): TLogoutFailedAction => ({
  type: LOGOUT_FAILED,
});

export const registerAction = (): TRegisterAction => ({
  type: REGISTER_REQUEST,
});

export const registerSuccesAction = (
  user: TForm,
  payload: TForm
): TRegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  user,
  payload,
});

export const registerFailedAction = (): TRegisterFailedAction => ({
  type: REGISTER_FAILED,
});

// DISPATCHhIiiiiiiiiiiiiiNG

export const loginSend = (data: TForm): AppThunk => {
  return function (dispatch) {
    dispatch(loginRequestAction());
    login(data)
      .then((res) => {
        localStorage.setItem("refreshToken", res.refreshToken);
        setCookie("accessToken", res.accessToken);
        dispatch(
          logingSuccessAction(res.user, res.refreshToken, res.accessToken)
        );
      })
      .catch((err: string) => {
        dispatch(loginFailedAction());
      });
  };
};

export const logoutSend = (): AppThunk => {
  return function (dispatch) {
    logout()
      .then(
        dispatch(logoutAction()),
        localStorage.clear(),
        //@ts-ignore
        deleteCookie("accessToken")
      )
      .catch((err) => {
        dispatch(logoutFailedAction());
      });
  };
};

export const registerSend = (data: TForm): AppThunk => {
  return function (dispatch) {
    dispatch(registerAction());
    register(data)
      .then((res) => {
        dispatch(registerSuccesAction(res.user, res));
      })
      .catch((err) => {
        dispatch(registerFailedAction());
      });
  };
};
