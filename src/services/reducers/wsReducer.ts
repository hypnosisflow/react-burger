import { createReducer } from "@reduxjs/toolkit";
import { TOrderInfo } from "../../utils/types";
import {
  WebsocketStatus,
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen,
} from "./../actions/wsActions";

export type TWsStore = {
  status: WebsocketStatus;
  orders: Array<TOrderInfo>;
  connectionError: string | null;
  total: number; 
  totalToday: number;
};

export const initialState: TWsStore = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectionError: null,
  total: 0,
  totalToday: 0
};

export const wsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday; 
    });
});
