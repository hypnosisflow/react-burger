import { AnyAction, Dispatch } from "redux";
import { makeOrder } from "../../utils/api";

import {
  ORDER_REQUEST,
  ORDER_FAILED,
  ORDER_RESET,
  ORDER_SUCCESS,
} from "../constants/order";

export type TOrderAction = {
  readonly type: typeof ORDER_REQUEST;
};

export type TOrderFailedAction = {
  readonly type: typeof ORDER_FAILED;
};

export type TOrderResetAction = {
  readonly type: typeof ORDER_RESET;
};

export type TOrderSuccessAction = {
  readonly type: typeof ORDER_SUCCESS;
  readonly payload: number;
};

export type TOrderActions =
  | TOrderAction
  | TOrderFailedAction
  | TOrderSuccessAction
  | TOrderResetAction;

export const orderAction = (): TOrderAction => ({
  type: ORDER_REQUEST,
});

export const orderFailedAction = (): TOrderFailedAction => ({
  type: ORDER_FAILED,
});

export const orderResetAction = (): TOrderResetAction => ({
  type: ORDER_RESET,
});

export const orderSuccessAction = (payload: number): TOrderSuccessAction => ({
  type: ORDER_SUCCESS,
  payload,
});

export const sendOrder: Function = () => {
  return function (dispatch: any, getState: any) {
    const products = getState().cart.items;
    const bun = getState().cart.bun._id;
    const request = products.map((i: any) => i._id);
    const data = [bun, ...request, bun];

    dispatch({ type: ORDER_REQUEST });
    if (!bun) {
      return;
    }
    makeOrder(data)
      .then((res) => {
        console.log(res.order.number);
        if (res && res.success) {
          dispatch({ type: ORDER_SUCCESS, payload: res.order.number });
        } else {
          dispatch({ type: ORDER_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: ORDER_FAILED });
      });
  };
};
