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

export const SET_USER_REQUEST = "SET_USER_REQUEST";
export const SET_USER = "SET_USER";
export const SET_USER_FAILED = "SET_USER_FAILED";
export const TOKEN_UPDATE = "TOKEN_UPDATE";

export const RESET_REQUEST = "RESET_REQUEST";
export const RESET_SUCCESS = "RESET_SUCCESS";

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
        dispatch({ type: REGISTER_FAILED, payload: err.message });
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
        dispatch({ type: LOGIN_FAILED });
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
        dispatch({ type: EDIT_FAILED });
      });
  };
};

export const logoutSend = () => {
  return function (dispatch) {
    logout().then(
      localStorage.clear(),
      deleteCookie("accessToken"),
      dispatch({ type: LOGOUT })
    );
  };
};

export const getNewToken = (afterRefresh) => {
  return function (dispatch) {
    tokenUpdate().then((res) => {
      dispatch({
        type: TOKEN_UPDATE,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      });
      dispatch(afterRefresh);
    });
  };
};

export const checkUserAuth = () => (dispatch) => {
  if (getCookie("accessToken")) {
    dispatch(getUser()).finally(() => {
      dispatch({ type: "AUTH_CHECKED" });
    });
  } else {
    dispatch({ type: "AUTH_CHECKED" });
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
          dispatch({ type: SET_USER_FAILED, payload: err.message });
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
          payload: res.message
        })
      
      })
      .catch((err) => Promise.reject(err));
  };
};

export const resetPassword = (data) => {
  return function (dispatch) {
    passwordReset(data)
      .then((res) => {
        dispatch({ type: RESET_SUCCESS, payload: res.message });
      })
      .catch((err) => Promise.reject(err));
  };
};
