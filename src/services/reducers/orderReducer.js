import { ORDER_FAILED, ORDER_REQUEST, ORDER_SUCCESS, ORDER_RESET } from "../actions/order";

const initialState = {
  orderNumber: 0,

  orderFailed: false,
  orderRequest: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return { ...state, orderNumber: 0,  orderRequest: true, orderFailed: false };
    }
    case ORDER_SUCCESS: {
      return { ...state, orderNumber: action.payload, orderRequest: false, orderFailed: false };
    }
    case ORDER_FAILED: {
      return { ...state, orderNumber: 0, orderRequest: false, orderFailed: true };
    }
    case ORDER_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};