import { createAction } from "@reduxjs/toolkit";
import { IWsMessage as IWsProfileMessage } from "./wsActions";

export enum WebsocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export const connect = createAction<string, "PROFILE_ORDERS_CONNECT">("PROFILE_ORDERS_CONNECT");
export const disconnect = createAction("PROFILE_ORDERS_DISCONNECT");
export const wsConnecting = createAction("PROFILE_WS_CONNECTING");
export const wsOpen = createAction("PROFILE_WS_OPEN");
export const wsClose = createAction("PROFILE_WS_CLOSE");
export const wsMessage = createAction<IWsProfileMessage, "PROFILE_WS_MESSAGE">("PROFILE_WS_MESSAGE"); // СДЕЛАТЬ ТИП
export const wsError = createAction<string, "PROFILE_WS_ERROR">("PROFILE_WS_ERROR");

export type TProfileOrdersWsActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;
