import { TProfileActions } from "./../actions/user";
import { TUserAuthActions } from "../actions/login";

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


export type TAuthState = {
  user?: TForm | null;

  registerSucces: boolean;
  registerError: boolean;

  resetAllowed: boolean;
  reseted: boolean,

  loginSucces: boolean;
  loginError: boolean;

  loggedIn: boolean;

  authChecked?: boolean;

  errorMessage?: string;
};

const initialState: TAuthState = {
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

};

export const authReducer = (
  state = initialState,
  action: TUserAuthActions
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
        user: action.user,
        registerSucces: true,
        registerError: false,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        user: null,
        registerSucces: false,
        registerError: true,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loggedIn: false,
        loginSucces: false,
        loginError: false,
        resetAllowed: false,
        reseted: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.user,
        loginSucces: true,
        loginError: false,
        loggedIn: true,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginSucces: false,
        loginError: true,
        loggedIn: false,
      };
    }
    case LOGOUT: {
      return { ...initialState };
    }
    case LOGOUT_FAILED: {
      return { ...state };
    }
    case SET_USER_REQUEST: {
      return { ...state };
    }
    case SET_USER_SUCCESS: {
      return { ...state, user: action.user, loggedIn: true };
    }

    case AUTH_CHECKED: {
      return { ...state, loggedIn: true, authChecked: true };
    }
    case AUTH_FAILED: {
      return { ...state, loggedIn: false };
    }

    case EDIT_SUCCESS: {
      return { ...state, user: action.payload };
    }
    case RESET_REQUEST: {
      return { ...state, resetAllowed: false };
    }
    case RESET_REQUEST_FAILED: {
      return { ...state, resetAllowed: false };
    }
    case RESET_SUCCESS: {
      return { ...state, resetAllowed: true };
    }
    case RESETED: {
      return {...state, resetAllowed: false, reseted: true}
    }

    default: {
      return state;
    }
  }
};
