import {
  AUTH_CHECKED,
  AUTH_FAILED,
  EDIT_FAILED,
  EDIT_REQUEST,
  EDIT_SUCCESS,
  RESET_FAILED,
  RESET_REQUEST,
  RESET_REQUEST_FAILED,
  RESET_SUCCESS,
  RESETED,
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
} from "../constants/profile";
import {
  refreshToken,
  BASE_URL,
  fetchWithRefresh,
  editProfileRequest,
  passwordResetRequest,
  passwordReset,
} from "../../utils/api";
import { getCookie, setCookie } from "../../utils/utils";
import { TForm } from "../../utils/types";
import { AppThunk } from "../../utils/store-type";

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

// Setting User

export type TUserAction = {
  readonly type: typeof SET_USER_REQUEST;
};

export type TUserSuccessAction = {
  readonly type: typeof SET_USER_SUCCESS;
  readonly user?: TForm;
  readonly payload?: TForm;
  readonly data?: TForm;
};

export type TUserActions =
  | TUserAction
  | TUserSuccessAction
  | TAuthCheckAction
  | TAuthFailedAction;

// Edit, Passwords Types

export type TEditAction = {
  readonly type: typeof EDIT_REQUEST;
};

export type TEditSuccessAction = {
  readonly type: typeof EDIT_SUCCESS;
  readonly payload?: TForm;
};

export type TEditFailedAction = {
  readonly type: typeof EDIT_FAILED;
};

export type TResetAction = {
  readonly type: typeof RESET_REQUEST;
};

export type TResetFailedRequestAction = {
  readonly type: typeof RESET_REQUEST_FAILED;
};

export type TResetSuccessAction = {
  readonly type: typeof RESET_SUCCESS;
};

export type TResetFailedAction = {
  readonly type: typeof RESET_FAILED;
};

export type TResetedAction = {
  readonly type: typeof RESETED;
};

export type TProfileActions =
  | TEditAction
  | TEditSuccessAction
  | TEditFailedAction
  | TResetAction
  | TResetedAction
  | TResetFailedAction
  | TResetSuccessAction
  | TResetFailedRequestAction;

// ACTIONS

// Setting user

export const setUserAction = (): TUserAction => ({
  type: SET_USER_REQUEST,
});

export const setUserSuccessAction = (user: TForm): TUserSuccessAction => ({
  type: SET_USER_SUCCESS,
  user,
});

// Edit, Reset

export const editAction = (): TEditAction => ({
  type: EDIT_REQUEST,
});

export const editSuccessAction = (): TEditSuccessAction => ({
  type: EDIT_SUCCESS,
});

export const editFailedAction = (): TEditFailedAction => ({
  type: EDIT_FAILED,
});

export const resetAction = (): TResetAction => ({
  type: RESET_REQUEST,
});

export const resetFailedRequestAction = (): TResetFailedRequestAction => ({
  type: RESET_REQUEST_FAILED,
});

export const resetSuccesAction = (): TResetSuccessAction => ({
  type: RESET_SUCCESS,
});

export const resetFailedAction = (): TResetFailedAction => ({
  type: RESET_FAILED,
});

export const resetSuccessData = (): TResetedAction => ({
  type: RESETED,
});

// THUNKS

// Token, Get User

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
      .catch((err) => {
        console.log("Token Update Error", err);
      });
  };
};

export function getUser(): AppThunk {
  return function (dispatch) {
    fetchWithRefresh(`${BASE_URL}auth/user`, {
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
}

// Edit Profile
// Forgot Passwod
// Reset Password

export const editProfile = (data: TForm): AppThunk => {
  return function (dispatch) {
    dispatch({ type: EDIT_REQUEST });
    editProfileRequest(data)
      .then((res) => {
        dispatch({ type: EDIT_SUCCESS, payload: res.user });
      })
      .catch((err) => {
        dispatch({ type: EDIT_FAILED, payload: err });
      });
  };
};

export const forgotPassword = (data: TForm): AppThunk => {
  return function (dispatch) {
    dispatch({ type: RESET_REQUEST });
    passwordResetRequest(data)
      .then((res) => {
        dispatch({
          type: RESET_SUCCESS,
          payload: res.message,
        });
      })
      .catch((err) => {
        dispatch({ type: RESET_REQUEST_FAILED });
        console.log(err);
      });
  };
};

export const resetPassword = (data: TForm): AppThunk => {
  return function (dispatch) {
    passwordReset(data)
      .then((res) => {
        dispatch({ type: RESETED });
      })
      .catch((err) => {
        dispatch({ type: RESET_FAILED, payload: err });
      });
  };
};
