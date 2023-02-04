import {
  connect as OrdersWsConnect,
  disconnect as OrdersWsDisconnect,
  wsOpen as OrdersWsOpen,
  wsClose as OrdersWsClose,
  wsMessage as OrdersWsMessage,
  wsError as OrdersWsError,
  wsConnecting as OrdersWsConnecting,
} from "../actions/wsActions";

import {
  connect as ProfileOrdersWsConnect,
  disconnect as ProfileOrdersWsDisconnect,
  wsOpen as ProfileOrdersWsOpen,
  wsClose as ProfileOrdersWsClose,
  wsMessage as ProfileOrdersWsMessage,
  wsError as ProfileOrdersWsError,
  wsConnecting as ProfileOrdersWsConnecting,
} from "../actions/wsProfileActions";

export const ordersWsActions = {
  wsConnect: OrdersWsConnect,
  wsDisconnect: OrdersWsDisconnect,
  wsConnecting: OrdersWsConnecting,
  onOpen: OrdersWsOpen,
  onClose: OrdersWsClose,
  onError: OrdersWsError,
  onMessage: OrdersWsMessage,
};

export const profileOrdersWsActions = {
  wsConnect: ProfileOrdersWsConnect,
  wsDisconnect: ProfileOrdersWsDisconnect,
  wsConnecting: ProfileOrdersWsConnecting,
  onOpen: ProfileOrdersWsOpen,
  onClose: ProfileOrdersWsClose,
  onError: ProfileOrdersWsError,
  onMessage: ProfileOrdersWsMessage,
};
