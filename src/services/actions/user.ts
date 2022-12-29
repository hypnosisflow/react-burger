import {
  TOKEN_UPDATE,
  TOKEN_UPDATE_FAILED,
  AUTH_CHECKED,
  AUTH_FAILED,
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
  SET_USER_FAILED,
} from "../constants/profile";
import { tokenUpdate, getUserRequest } from "../../utils/api";
import { getCookie } from "../../utils/utils";
import { TForm } from "../../utils/types";
import { Dispatch } from "redux";

// token
export type TTokenAction = {
  readonly type: typeof TOKEN_UPDATE;
  readonly accessToken: string;
  readonly payload?: any;
};

export type TTokenFailedAction = {
  readonly type: typeof TOKEN_UPDATE_FAILED;
};

export const tokenAction = (accessToken: string): TTokenAction => ({
  type: TOKEN_UPDATE,
  accessToken,
});

export const tokenFailedAction = (): TTokenFailedAction => ({
  type: TOKEN_UPDATE_FAILED,
});

// auth section
export type TAuthCheckAction = {
  readonly type: typeof AUTH_CHECKED;
};

export type TAuthFailedAction = {
  readonly type: typeof AUTH_FAILED;
};

export const authCheckAction = (): TAuthCheckAction => ({
  type: AUTH_CHECKED,
});

export const authFailedAcion = (): TAuthFailedAction => ({
  type: AUTH_FAILED,
});

// setting user section

export type TUserAction = {
  readonly type: typeof SET_USER_REQUEST;
  readonly payload?: any;
  readonly data: any;
};

export type TUserSuccessAction = {
  readonly type: typeof SET_USER_SUCCESS;
  readonly user: TForm;
  readonly payload?: any;
  readonly data: any;
};

export type TUserFailedActon = {
  readonly type: typeof SET_USER_FAILED;
};

export type TUserActions =
  | TUserAction
  | TUserSuccessAction
  | TUserFailedActon
  | TAuthCheckAction
  | TAuthFailedAction
  | TTokenAction
  | TTokenFailedAction;

export const setUserAction = (data: any): TUserAction => ({
  type: SET_USER_REQUEST,
  data,
});

export const setUserSuccessAction = (
  user: TForm,
  data: any
): TUserSuccessAction => ({
  type: SET_USER_SUCCESS,
  user,
  data,
});

export const setUserFailedAction = (): TUserFailedActon => ({
  type: SET_USER_FAILED,
});

// diSPAtChiNG

export const getNewToken = (afterRefresh: any) => {
  return function (dispatch: Dispatch) {
    tokenUpdate()
      .then((res) => {
        dispatch({
          type: TOKEN_UPDATE,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        });
        dispatch(afterRefresh);
      })
      .catch((err) => {
        dispatch({ type: TOKEN_UPDATE_FAILED, payload: err });
      });
  };
};

export const checkUserAuth = () => (dispatch: any) => {
  if (getCookie("accessToken")) {
    dispatch(getUser())
      .then(() => {
        dispatch({ type: AUTH_CHECKED });
      })
      .catch((err: any) => {
        dispatch({ type: AUTH_FAILED, payload: err });
      });
  }
};

export const getUser = () => {
  return function (dispatch: Dispatch) {
    dispatch({ type: SET_USER_REQUEST });
    getUserRequest()
      .then((res) => {
        dispatch({
          type: SET_USER_SUCCESS,
          payload: res.user,
        });
      })
      .catch((err) => {
        if (err.message === "jwt expired") {
          tokenUpdate(getUser()).then((res) => {
            dispatch({
              type: TOKEN_UPDATE,
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
            });
          });
        } else {
          dispatch({ type: SET_USER_FAILED, payload: err });
        }
      });
  };
};
