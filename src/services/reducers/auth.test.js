import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGOUT,
  LOGOUT_FAILED,
} from "../constants/login";
import {
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
  AUTH_CHECKED,
  AUTH_FAILED,
  EDIT_SUCCESS,
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_REQUEST_FAILED,
  RESETED,
} from "../constants/profile";
import { authReducer, initialState } from "./authReducers";

describe("Auth reducer", () => {
  test("initial state", () => {
    expect(authReducer(undefined, {})).toEqual({
      user: null,

      registerSucces: false,
      registerError: false,

      resetAllowed: false,
      reseted: false,

      loginSucces: false,
      loginError: false,

      loggedIn: false,

      authChecked: false,
      errorMessage: "",
    });
  });

  // login

  it("should handle LOGIN_REQUEST", () => {
    expect(
      authReducer([], {
        type: LOGIN_REQUEST,
      })
    ).toEqual({
      ...initialState,
      loggedIn: false,
      loginSucces: false,
      loginError: false,
      resetAllowed: false,
      reseted: false,
    });
  });

  it("should handle LOGIN_SUCCESS", () => {
    let logSuccess = "Logged In";
    let userSuccess = "User here";
    expect(
      authReducer([], {
        type: LOGIN_SUCCESS,
        payload: logSuccess,
        user: userSuccess,
      })
    ).toEqual({
      ...initialState,
      user: userSuccess,
      loginSucces: true,
      loginError: false,
      loggedIn: true,
    });
  });

  it("should handle LOGIN_FAILED", () => {
    let logFail = "Log Fail";
    let error = "Error received";
    expect(
      authReducer([], {
        type: LOGIN_FAILED,
      })
    ).toEqual({
      ...initialState,
      loginSucces: false,
      loginError: true,
      loggedIn: false,
    });
  });

  // register

  it("should handle REGISTER_REQUEST", () => {
    expect(
      authReducer([], {
        type: REGISTER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      registerSucces: false,
      registerError: false,
    });
  });

  it("should handle REGISTER_SUCCES", () => {
    let user = "User here";
    expect(
      authReducer([], {
        type: REGISTER_SUCCESS,
        user: user,
      })
    ).toEqual({
      ...initialState,
      user: user,
      registerSucces: true,
      registerError: false,
    });
  });

  it("should handle REGISTER_FAILED", () => {
    let user = null;
    let errorMessage = "Register failed";
    expect(
      authReducer([], {
        type: REGISTER_FAILED,
        error: errorMessage,
      })
    ).toEqual({
      ...initialState,
      user: user,
      registerSucces: false,
      registerError: true,
    });
  });

  // logout

  it("should handle LOGOUT", () => {
    expect(
      authReducer([], {
        type: LOGOUT,
      })
    ).toEqual({
      user: null,

      registerSucces: false,
      registerError: false,

      resetAllowed: false,
      reseted: false,

      loginSucces: false,
      loginError: false,

      loggedIn: false,

      authChecked: false,
      errorMessage: "",
    });
  });

  it("should handle LOGOUT_FAILED", () => {
    expect(
      authReducer([], {
        type: LOGOUT_FAILED,
      })
    ).toEqual({
      ...initialState,
    });
  });

  it("should handle SET_USER_REQUEST", () => {
    expect(
      authReducer([], {
        type: SET_USER_REQUEST,
      })
    ).toEqual({
      ...initialState,
    });
  });

  it("should handle SET_USER_SUCCESS", () => {
    let userMock = "User setted";
    expect(
      authReducer([], {
        type: SET_USER_SUCCESS,
        user: userMock,
      })
    ).toEqual({
      ...initialState,
      user: userMock,
      loggedIn: true,
    });
  });

  it("should handle AUTH_CHECKED", () => {
    expect(
      authReducer([], {
        type: AUTH_CHECKED,
      })
    ).toEqual({
      ...initialState,
      loggedIn: true,
      authChecked: true,
    });
  });

  it("should handle AUTH_FAILED", () => {
    expect(
      authReducer([], {
        type: AUTH_FAILED,
      })
    ).toEqual({
      ...initialState,
      loggedIn: false,
    });
  });

  it("should handle EDIT_SUCCESS", () => {
    let userMock = "User editted";
    expect(
      authReducer([], {
        type: EDIT_SUCCESS,
      })
    ).toEqual({
      ...initialState,
    });
  });

  it("should handle RESET_REQUEST", () => {
    expect(
      authReducer([], {
        type: RESET_REQUEST,
      })
    ).toEqual({
      ...initialState,
      resetAllowed: false,
    });
  });

  it("should handle RESET_SUCCESS", () => {
    expect(
      authReducer([], {
        type: RESET_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      resetAllowed: true,
    });
  });

  it("should handle RESET_REQUEST_FAILED", () => {
    expect(
      authReducer([], {
        type: RESET_REQUEST_FAILED,
      })
    ).toEqual({
      ...initialState,
      resetAllowed: false,
    });
  });

  it("should handle RESETED", () => {
    expect(
      authReducer([], {
        type: RESETED,
      })
    ).toEqual({
      ...initialState,
      resetAllowed: false,
      reseted: true,
    });
  });
});
