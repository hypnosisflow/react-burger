import { WS_CONNECTION_ERROR } from "./../constants/ws";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "../constants/ws";

export type TWsStartActoin = {
  readonly type: typeof WS_CONNECTION_START;
  readonly url: string;
};

export type TWsSuccessAction = {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload: string;
};

export type TWsErrorAction = {
  readonly type: typeof WS_CONNECTION_ERROR;
};

export type TWsCloseAction = {
  readonly type: typeof WS_CONNECTION_CLOSED;
};
export type TWsGetMessageAction = {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: string;
};
export type TWsSendMessageAction = {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: string;
};

export type TWsActions =
  | TWsStartActoin
  | TWsSuccessAction
  | TWsErrorAction
  | TWsCloseAction
  | TWsGetMessageAction
  | TWsSendMessageAction;

export const wsConnectionStart = (url: string): TWsStartActoin => ({
  type: WS_CONNECTION_START,
  url,
});

export const wsConnectionSuccess = (data: any): TWsSuccessAction => ({
  type: WS_CONNECTION_SUCCESS,
  payload: data,
});

export const wsConnectionError = (): TWsErrorAction => ({
  type: WS_CONNECTION_ERROR,
});

export const wsConnectionClose = (): TWsCloseAction => ({
  type: WS_CONNECTION_CLOSED,
});

export const wsGetMessage = (data: any): TWsGetMessageAction => ({
  type: WS_GET_MESSAGE,
  payload: data,
});

export const wsSendMessage = (message: string): TWsSendMessageAction => ({
  type: WS_SEND_MESSAGE,
  payload: message,
});
