import { ORDER_FAILED, ORDER_REQUEST, ORDER_SUCCESS } from "../actions/fetch";

const initialState = {
  order: [],
  orderNumber: null,

  orderFailed: false,
  orderRequest: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return { ...state, orderRequest: true, orderFailed: false };
    }
    case ORDER_SUCCESS: {
        return {...state, }
    }
    case ORDER_FAILED: {
        return {...state}
    }
    default: {
      return state;
    }
  }
};
