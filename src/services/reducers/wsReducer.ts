import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "../constants/ws";

import { TWsActions } from "../actions/wsActions";

export type TWSState = {
  wsConnected: boolean;
  data: any;
  error?: '';
};

const initialState: TWSState = {
  wsConnected: false,
  data: null,
  error: ''
};

export const wsReducer = (state = initialState, action: TWsActions) => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...state,
        wsConnected: true,
      };
    }
    case WS_CONNECTION_SUCCESS:
      return { 
        ...state,
        error: '',
        wsConnected: true,
        // data: action.payload
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: '',
        wsConnected: false,
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: '',
        data: action.payload,
      };
    default:
      return state;
  }
};
