import { TIngredientItem } from './../../../../../maket/src/utils/types';
import { AppThunk } from "../../utils/store-type";
import { makeOrder, orderHistoryRequest } from "../../utils/api";

import {
  ORDER_REQUEST,
  ORDER_FAILED,
  ORDER_RESET,
  ORDER_SUCCESS,
  ORDER_ADD_DETAILS,
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_SUCCESS,
} from "../constants/order";
import { IIngredient, TOrderInfo } from "../../utils/types";

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

export type TOrderAddDetailsAction = {
  readonly type: typeof ORDER_ADD_DETAILS;
  readonly payload: number;
};

export type TOrderHistoryRequestAction = {
  readonly type: typeof ORDER_HISTORY_REQUEST;
};

export type TOrderHistorySuccessAction = {
  readonly type: typeof ORDER_HISTORY_SUCCESS;
  readonly payload: Array<TOrderInfo>;
};

export type TOrderActions =
  | TOrderAction
  | TOrderFailedAction
  | TOrderSuccessAction
  | TOrderAddDetailsAction
  | TOrderResetAction
  | TOrderHistoryRequestAction
  | TOrderHistorySuccessAction;

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

export const orderHistoryRequestAction = (
  payload: number
): TOrderHistoryRequestAction => ({
  type: ORDER_HISTORY_REQUEST,
});

export const orderHistorySuccessAction = (
  payload: Array<TOrderInfo>
): TOrderHistorySuccessAction => ({
  type: ORDER_HISTORY_SUCCESS,
  payload,
});

export const sendOrder= (): AppThunk => {
  return function (dispatch, getState) {
    //@ts-ignore
    const products = getState().cart.items;
    // @ts-ignore
    const bun = getState().cart.bun._id;
    const request = products.map((i: IIngredient) => i._id);
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

export const URL_REQ = "wss://norma.nomoreparties.space/orders";

export const orderRequest = (num: number): AppThunk => {
  return function (dispatch, getState) {
    dispatch({ type: ORDER_HISTORY_REQUEST });
    orderHistoryRequest(num).then((res) => {
      if (res && res.success) {
        dispatch({ type: ORDER_HISTORY_SUCCESS, payload: res.orders });
      }
    });
  };
};
