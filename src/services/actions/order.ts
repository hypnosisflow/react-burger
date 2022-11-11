import { AnyAction, Dispatch } from "redux";
import { makeOrder } from "../../utils/api";

export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_FAILED = "ORDER_FAILED";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_RESET = "ORDER_RESET"



export const sendOrder: Function = () => {
    return function (dispatch: any , getState: any) {
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
          console.log(res.order.number)
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
  }