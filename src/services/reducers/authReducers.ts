import { TLoginActions } from "./../actions/login";
import { TForm } from "./../../utils/types";

import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_FAILED,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAILED,
} from "../constants/login";

export type TAuthState = {
  user?: TForm;

  registerSucces: boolean;
  registerError: boolean;

  loginSucces: boolean;
  loginError: boolean;

  loggedIn: boolean;

  data: null;

  resetRequest: boolean;
  resetSuccess: boolean;

  accessToken?: string;
  refreshToken?: string;
};

const initialState = {
  user: {},

  registerSucces: false,
  registerError: false,

  loginSucces: false,
  loginError: false,

  loggedIn: false,

  data: null,

  resetRequest: false,
  resetSuccess: false,

  accessToken: "",
  refreshToken: "",
};

export const authReducer = (
  state = initialState,
  action: TLoginActions
): TAuthState => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerSucces: false,
        registerError: false,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        registerSucces: true,
        registerError: false,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        user: {},
        registerSucces: false,
        registerError: true,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginSucces: false,
        loginError: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        loginSucces: true,
        loginError: false,
        loggedIn: true,
      };
    }
    case LOGIN_FAILED: {
      return { ...state, loginSucces: false, loginError: true, loggedIn: true };
    }
    case LOGOUT: {
      return { ...initialState };
    }
    case LOGOUT_FAILED: {
      return { ...state };
    }
    default: {
      return state;
    }
  }
};
