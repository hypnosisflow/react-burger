import { TIngredientItem } from "./../../utils/types";
import { TFetchActions } from "./../actions/menu";
import { FETCH_FAILED, FETCH_SUCCESS, FETCH_REQUEST } from "../constants/menu";

export type TMenuState = {
  menu: TIngredientItem[];
  menuRequest: boolean;
  menuFailed: boolean;
  menuSuccess: boolean;
};

const initialState = {
  menu: [],
  menuRequest: false,
  menuFailed: false,
  menuSuccess: false,
};

export const menuReducer = (
  state = initialState,
  action: TFetchActions
): TMenuState => {
  switch (action.type) {
    case FETCH_REQUEST: {
      return {
        ...state,
        menuRequest: true,
        menuSuccess: false,
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        menu: [
          ...state.menu,
          ...action.menu.map((i: TIngredientItem) => ({ item: i })),
        ],
        menuRequest: false,
        menuFailed: false,
        menuSuccess: true,
      };
    }
    case FETCH_FAILED: {
      return {
        ...state,
        menu: [],
        menuFailed: true,
        menuRequest: false,
        menuSuccess: false,
      };
    }
    default: {
      return state;
    }
  }
};
