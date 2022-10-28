import {
  REGISTER_SUCCESS,
  REGISTER_REQUSET,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  TOKEN_UPDATE,
  SET_USER,
  EDIT_SUCCESS,
  LOGOUT,
  RESET_REQUEST,
  RESET_SUCCESS,
  SET_USER_FAILED,
  RESET_REQUEST_FAILED,
  AUTH_CHECKED,
  AUTH_FAILED
} from "../actions/login";

const initialState = {
  user: null,

  registerSucces: false,
  registerError: false,

  loginSucces: false,
  loginError: false,

  loggedIn: false,

  data: null,

  accessToken: "",
  refreshToken: "",

  resetRequest: false,
  resetSuccess: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUSET: {
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
        user: null,
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
        loggedIn: true
      };
    }
    case LOGIN_FAILED: {
      return { ...state, loginSucces: false, loginError: true, loggedIn: true };
    }
    case LOGOUT: {
      return { ...initialState}
    }
    case SET_USER: {
      return {...state, user: action.payload, data: action.data }
    }
    case SET_USER_FAILED: {
      return {...state, user: null}
    }
    case EDIT_SUCCESS: {
      return {...state, user: action.payload }
    }
    case RESET_REQUEST: {
      return { ...state, resetRequest: true}
    }
    case RESET_REQUEST_FAILED: {
        return { ...state, resetRequest: false, resetSuccess: false}
    }
    case RESET_SUCCESS: {
      return { ...state, resetSuccess: true, resetRequest: true}
    }
    case AUTH_CHECKED: {
      return {...state, loggedIn: true}
    }
    case AUTH_FAILED: {
      return {...state, loggedIn: false }
    }
    case TOKEN_UPDATE: {
      return {
        ...state,
        // refreshToken: action.refreshToken,
        accessToken: action.accessToken,
      };
    }

    default: {
      return state;
    }
  }
};
