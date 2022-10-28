import {
  register,
  login,
  getUserRequest,
  tokenUpdate,
  logout,
  editProfileRequest,
  passwordResetRequest,
  passwordReset,
} from "../../utils/api";
import { setCookie, getCookie, deleteCookie } from "../../utils/utils";

export const REGISTER_REQUSET = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const EDIT_REQUEST = "EDIT_REQUEST";
export const EDIT_SUCCESS = "EDIT_SUCCESS";
export const EDIT_FAILED = "EDIT_FAILED";

export const LOGOUT = "LOGOUT";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const SET_USER_REQUEST = "SET_USER_REQUEST";
export const SET_USER = "SET_USER";
export const SET_USER_FAILED = "SET_USER_FAILED";

export const TOKEN_UPDATE = "TOKEN_UPDATE";
export const TOKEN_UPDATE_FAILED = "TOKEN_UPDATE_FAILED";

export const RESET_REQUEST = "RESET_REQUEST";
export const RESET_REQUEST_FAILED = "RESET_REQUEST_FAILED";
export const RESET_SUCCESS = "RESET_SUCCESS";
export const RESET_FAILED = "RESET_FAILED";

export const AUTH_CHECKED = "AUTH_CHECKED";
export const AUTH_FAILED = "AUTH_FAILED";

export const registerSend = (data) => {
  return function (dispatch) {
    dispatch({ type: REGISTER_REQUSET });
    register(data)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.message,
        });
      })
      .catch((err) => {
        dispatch({ type: REGISTER_FAILED, payload: err });
      });
  };
};

export const loginSend = (data) => {
  return function (dispatch) {
    dispatch({ type: LOGIN_REQUEST });
    login(data)
      .then((res) => {
        localStorage.setItem("refreshToken", res.refreshToken);
        setCookie("accessToken", res.accessToken);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.user,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        });
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAILED, payload: err });
      });
  };
};

export const editProfile = (data) => {
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

export const logoutSend = () => {
  return function (dispatch) {
    logout()
      .then(
        localStorage.clear(),
        deleteCookie("accessToken"),
        dispatch({ type: LOGOUT })
      )
      .catch((err) => {
        dispatch({ type: LOGOUT_FAILED, payload: err });
      });
  };
};

export const getNewToken = (afterRefresh) => {
  return function (dispatch) {
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

export const checkUserAuth = () => (dispatch) => {
  if (getCookie("accessToken")) {
    dispatch(getUser())
      .then(() => {
        dispatch({ type: AUTH_CHECKED });
      })
      .catch((err) => {
        dispatch({ type: AUTH_FAILED, payload: err });
      });
  }
};

export const getUser = () => {
  return function (dispatch) {
    dispatch({ type: SET_USER_REQUEST });
    getUserRequest()
      .then((res) => {
        dispatch({
          type: SET_USER,
          payload: res.user,
        });
      })
      .catch((err) => {
        if (err.message === "jwt expired") {
          dispatch(tokenUpdate(getUser()));
        } else {
          dispatch({ type: SET_USER_FAILED, payload: err });
        }
      });
  };
};

export const forgotPassword = (data) => {
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
        dispatch({ type: RESET_REQUEST_FAILED, payload: err });
      });
  };
};

export const resetPassword = (data) => {
  return function (dispatch) {
    passwordReset(data)
      .then((res) => {
        dispatch({ type: RESET_SUCCESS, payload: res.message });
      })
      .catch((err) => {
        dispatch({ type: RESET_FAILED, payload: err });
      });
  };
};
