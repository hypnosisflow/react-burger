import { TOrderActions } from "./../actions/order";
import {
  ORDER_FAILED,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_RESET,
  ORDER_ADD_DETAILS
} from "../constants/order";

export type TOrderState = {
  orderNumber: number | null;
  orderFailed: boolean;
  orderRequest: boolean;
  orderHistoryNumber?: number
  orderHistoryData?: {}
};

const initialState = {
  orderNumber: 0,
  orderHistoryNumber: 0,
  orderFailed: false,
  orderRequest: false,
  orderHistoryData: {}
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
        orderHistoryNumber: action.payload
      }
    }
    default: {
      return state;
    }
  }
};
