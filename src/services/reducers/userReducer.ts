import { TForm } from "../../utils/types";
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

import { TProfileActions } from "./../actions/profile";
import { TUserActions } from "./../actions/user";

export type TUserState = {
  user?: TForm | null;
  loggedIn: boolean;
  authChecked: boolean;
};

type TUserReducerActions = TProfileActions | TUserActions;

const initialState: TUserState = {
  user: null,
  loggedIn: false,
  authChecked: false
};

export const userReducer = (
  state = initialState,
  action: TUserReducerActions
): TUserState => {
  switch (action.type) {
    case SET_USER_REQUEST: {
      return { ...state };
    }
    case SET_USER_SUCCESS: {
      return { ...state, user: action.payload, loggedIn: true };
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
      return { ...state}
    }
    case RESET_REQUEST_FAILED: {
      return { ...state};
    }
    case RESET_SUCCESS: {
      return { ...state };
    }
    default: {
      return state;
    }
  }
};
