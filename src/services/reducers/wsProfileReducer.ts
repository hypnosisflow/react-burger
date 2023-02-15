import { createReducer } from "@reduxjs/toolkit";
import { TOrderInfo } from "../../utils/types";
import {
  WebsocketStatus,
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen,
} from "./../actions/wsProfileActions";

export type TWsProfileStore = {
  status: WebsocketStatus;
  orders: Array<TOrderInfo>;
  connectionError: string;
};

export const initialState: TWsProfileStore = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectionError: "",
};

export const wsProfileReducer = createReducer(initialState, (builder) => {
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
    });
});
