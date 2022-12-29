import { Dispatch } from "redux";
import { loadIngredients } from "../../utils/api";
import { TIngredientItem } from "../../utils/types";

import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILED,
  ADD_DETAILS,
  REMOVE_DETAILS,
} from "../constants/menu";

export type TFetchAction = {
  readonly type: typeof FETCH_REQUEST;
};

export type TFetchSuccessAction = {
  readonly type: typeof FETCH_SUCCESS;
  readonly menu: any;
};

export type TFetchFailedAction = {
  readonly type: typeof FETCH_FAILED;
};

export type TFetchActions =
  | TFetchAction
  | TFetchFailedAction
  | TFetchSuccessAction;

export const fetchAction = (): TFetchAction => ({
  type: FETCH_REQUEST,
});

export const fetchSuccessAction = (
  menu: Array<TIngredientItem>
): TFetchSuccessAction => ({
  type: FETCH_SUCCESS,
  menu: menu
});

export const fetchFailedAction = (): TFetchFailedAction => ({
  type: FETCH_FAILED,
});

export type TAddDetailsAction = {
  readonly type: typeof ADD_DETAILS;
  readonly payload: any;
};
export type TRemoveDetailsAction = {
  readonly type: typeof REMOVE_DETAILS;
};
export type TDetailsActions = TAddDetailsAction | TRemoveDetailsAction;

export const fetchData: Function = () => {
  return function (dispatch: any) {
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
        dispatch({ type: FETCH_FAILED, message: err.message });
      });
  };
};
