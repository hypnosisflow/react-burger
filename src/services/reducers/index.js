import { FETCH_FAILED, FETCH_SUCCESS, FETCH_REQUEST } from "../actions/fetch";
import { orderReducer } from "./orderReducer";
import { ingredientReducer } from "./ingredientReducer";
import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";

const initialState = {
  menu: [],
  menuRequest: false,
  menuFailed: false,
};

export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST: {
      return {
        ...state,
        menuRequest: true,
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        menu: [
          ...state.menu,
          ...action.menu.map((i) => ({ item: i, countItem: 0 })),
        ],
        menuRequest: false,
        menuFailed: false,
      };
    }
    case FETCH_FAILED: {
      return {
        ...state,
        menuFailed: true,
        menuRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  menu: menuReducer,
  order: orderReducer,
  ingredient: ingredientReducer,
  cart: cartReducer,
});
