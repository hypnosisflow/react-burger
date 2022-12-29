import {
  EDIT_REQUEST,
  EDIT_FAILED,
  EDIT_SUCCESS,
  RESET_FAILED,
  RESET_SUCCESS,
  RESET_REQUEST,
  RESET_REQUEST_FAILED,
} from "../constants/profile";

import {
  editProfileRequest,
  passwordResetRequest,
  passwordReset,
} from "../../utils/api";

import { TForm } from "../../utils/types";
import { Dispatch } from "redux";

// edit profile section
export type TEditAction = {
  readonly type: typeof EDIT_REQUEST;
};

export type TEditSuccessAction = {
  readonly type: typeof EDIT_SUCCESS;
  readonly payload?: any;
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

export type TProfileActions =
  | TEditAction
  | TEditSuccessAction
  | TEditFailedAction
  | TResetAction
  | TResetFailedAction
  | TResetSuccessAction
  | TResetFailedRequestAction;

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

export const editProfile = (data: TForm) => {
  return function (dispatch: Dispatch) {
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

export const forgotPassword = (data: TForm) => {
  return function (dispatch: Dispatch) {
    dispatch({ type: RESET_REQUEST });
    passwordResetRequest(data)
      .then((res) => {
        dispatch({
          type: RESET_SUCCESS,
          payload: res.message,
        });
      })
      .catch((err) => {
        dispatch({ type: RESET_REQUEST_FAILED, payload: err });
      });
  };
};

export const resetPassword = (data: TForm) => {
  return function (dispatch: Dispatch) {
    passwordReset(data)
      .then((res) => {
        dispatch({ type: RESET_SUCCESS, payload: res.message });
      })
      .catch((err) => {
        dispatch({ type: RESET_FAILED, payload: err });
      });
  };
};
