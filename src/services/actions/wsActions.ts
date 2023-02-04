import { createAction } from "@reduxjs/toolkit";
import { TOrderInfo } from "../../utils/types";

export interface IWsMessage {
  total: number,
  totalToday: number,
  orders: Array<TOrderInfo>
}

export enum WebsocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export const connect = createAction<string, "ORDERS_CONNECT">("ORDERS_CONNECT");
export const disconnect = createAction("ORDERS_DISCONNECT");
export const wsConnecting = createAction("WS_CONNECTING");
export const wsOpen = createAction("WS_OPEN");
export const wsClose = createAction("WS_CLOSE");
export const wsMessage = createAction<IWsMessage, "WS_MESSAGE">("WS_MESSAGE"); // СДЕЛАТЬ ТИП
export const wsError = createAction<string, "WS_ERROR">("WS_ERROR");

export type TWsActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;
