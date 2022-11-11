import { loadIngredients } from "../../utils/api";

export const FETCH_REQUEST = "FETCH_REQUEST";
export const FETCH_FAILED = "FETCH_FAILED";
export const FETCH_SUCCESS = "FETCH_SUCCESS";

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
        dispatch({ type: FETCH_FAILED });
      });
  };
}


