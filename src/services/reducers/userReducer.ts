import {
  SET_USER_FAILED,
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
  TOKEN_UPDATE,
  TOKEN_UPDATE_FAILED,
  AUTH_CHECKED,
  AUTH_FAILED,
  EDIT_SUCCESS,
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_REQUEST_FAILED,
} from "../constants/profile";

import { TProfileActions } from "./../actions/profile";
import { TUserActions } from "./../actions/user";
import { TForm } from "./../../utils/types";

export type TUserState = {
  user: TForm;

  data: any;
  loggedIn: boolean;

  accessToken: string;
  refreshToken: string;

  resetRequest: boolean,
  resetSuccess: boolean
};

type TUserReducerActions = TProfileActions | TUserActions;

const initialState = {
  user: {},
  data: null,

  loggedIn: false,

  accessToken: "",
  refreshToken: "",

  resetRequest: false,
  resetSuccess: false
};

export const userReducer = (
  state = initialState,
  action: TUserReducerActions
): TUserState => {
  switch (action.type) {
    case SET_USER_REQUEST: {
      return { ...state, user: action.payload, data: action.data };
    }

    case SET_USER_SUCCESS: {
      return { ...state, user: action.payload, data: action.data };
    }
    case SET_USER_FAILED: {
      return { ...state, user: {} };
    }

    case AUTH_CHECKED: {
      return { ...state, loggedIn: true };
    }
    case AUTH_FAILED: {
      return { ...state, loggedIn: false };
    }
    case TOKEN_UPDATE: {
      return {
        ...state,
        // refreshToken: action.refreshToken,
        accessToken: action.accessToken,
      };
    }
    case TOKEN_UPDATE_FAILED: {
      return {
        ...state,
      };
    }
    case EDIT_SUCCESS: {
      return { ...state, user: action.payload };
    }
    case RESET_REQUEST: {
      return { ...state, resetRequest: true };
    }
    case RESET_REQUEST_FAILED: {
      return { ...state, resetRequest: false, resetSuccess: false };
    }
    case RESET_SUCCESS: {
      return { ...state, resetSuccess: true, resetRequest: true };
    }
    default: {
      return state;
    }
  }
};
