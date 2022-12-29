import type { TApplicationActions, AppDispatch, RootState } from "./index";
import type { Middleware, MiddlewareAPI } from "redux";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "../services/constants/ws";

export const ordersWsActions = {
  wsConnect: WS_CONNECTION_START,
  wsDisconnect: WS_CONNECTION_CLOSED,
  wsConnecting: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

export type TWSA = {
  wsConnect: string;
  wsDisconnect: string;
  wsSendMessage: string;
  wsConnecting: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export const socketMiddleware: any = (
  url: string,
  wsAction: TWSA
): Middleware<{}, RootState> => {
  return ((store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const {
        wsConnect,
        wsConnecting,
        wsDisconnect,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsAction;

      if (type === wsConnect) {
        socket = new WebSocket(url);
        dispatch({ type: wsConnecting });
      }
      console.log(socket, " socket ");

      if (socket) {
        // открытие сокета
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };
        socket.onerror = (error) => {
          dispatch({ type: onError, error: JSON.stringify(error) });
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch({ type: onMessage, payload: parsedData });
        };
        socket.onclose = (event) => {
          if (event.code === 1000) {
            dispatch({ type: onClose });
          }
          dispatch({ type: onError, error: event.code.toString() });
        };

        // if (type === onMessage) {
        //   const message = payload;
        //   socket.send(JSON.stringify(message));
        // }
      }
      next(action);
    };
  }) as Middleware;
};
