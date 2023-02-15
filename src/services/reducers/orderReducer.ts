import { TOrderInfo } from './../../utils/types';
import { TOrderActions } from "./../actions/order";
import {
  ORDER_FAILED,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_RESET,
  ORDER_ADD_DETAILS,
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_SUCCESS,
  ORDER_HISTORY_FAILED
} from "../constants/order";

export type TOrderState = {
  orderNumber: number;
  orderFailed: boolean;
  orderRequest: boolean;
  orderHistoryNumber?: number;
  orders?: TOrderInfo[] | null;
};

export const initialState: TOrderState = {
  orderNumber: 0,
  orderHistoryNumber: 0,
  orderFailed: false,
  orderRequest: false,
  orders: null,
};

export const orderReducer = (
  state = initialState,
  action: TOrderActions
): TOrderState => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return {
        ...state,
        orderNumber: 0,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.payload,
        orderRequest: false,
        orderFailed: false,
      };
    }
    case ORDER_FAILED: {
      return {
        ...state,
        orderNumber: 0,
        orderRequest: false,
        orderFailed: true,
      };
    }
    case ORDER_RESET: {
      return initialState;
    }
    case ORDER_ADD_DETAILS: {
      return {
        ...state,
        orderHistoryNumber: action.payload,
      };
    }
    case ORDER_HISTORY_REQUEST: {
      return {
        ...state,
      };
    }
    case ORDER_HISTORY_SUCCESS: {
      return {
        ...state,
        orders: action.payload,
      };
    }
    case ORDER_HISTORY_FAILED: {
      return {
        ...state,
      }
    }
    default: {
      return state;
    }
  }
};
