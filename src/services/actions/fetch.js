import { loadIngredients, makeOrder } from "../../utils/api";

export const FETCH_REQUEST = "FETCH_REQUEST";
export const FETCH_FAILED = "FETCH_FAILED";
export const FETCH_SUCCESS = "FETCH_SUCCESS";

export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_FAILED = "ORDER_FAILED";
export const ORDER_SUCCESS = "ORDER_SUCCESS";

export function fetchData() {
  return function (dispatch) {
    dispatch({
      type: FETCH_REQUEST,
    });
    loadIngredients()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: FETCH_SUCCESS,
            menu: res.data,
          });
        } else {
          dispatch({
            type: FETCH_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: FETCH_FAILED });
      });
  };
}

export function sendOrder() {
  return function (dispatch, getState) {
    const products = getState().menu.constructorItems;
    const request = products.map((i) => i._id);
    console.log("SENDING", request);

    dispatch({ type: ORDER_REQUEST });
    makeOrder(request)
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: ORDER_SUCCESS, orderNumber: res.data });
        } else {
          dispatch({ type: ORDER_FAILED });
        }
      })
      .catch((err) => {
        dispatch({ type: ORDER_FAILED });
      });
  };
}
