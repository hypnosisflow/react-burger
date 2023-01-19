import { createReducer } from "@reduxjs/toolkit";
import {
  WebsocketStatus,
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen,
} from "./../actions/wsProfileActions";

export type TWsStore = {
  status: WebsocketStatus;
  data: [];
  connectionError: string;
};

const initialState: TWsStore = {
  status: WebsocketStatus.OFFLINE,
  data: [],
  connectionError: "",
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
      state.data = action.payload;
    });
});
