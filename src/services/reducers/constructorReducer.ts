import { TConstructorActions } from "./../actions/constructor";
import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  REORDER_PRODUCTS,
  RESET,
} from "../constants/constructor";
import { IIngredient } from "../../utils/types";

export type TConstructorState = {
  bun?: IIngredient;
  items: Array<IIngredient>;
};

const initialState: TConstructorState = {
  //@ts-ignore
  bun: {},
  items: [],
};

export const constructorReducer = (
  state = initialState,
  action: TConstructorActions
): TConstructorState => {
  switch (action.type) {
    case ADD_PRODUCT: {
      if (action.payload.type === "bun") {
        return { ...state, bun: action.payload, items: [...state.items] };
      } else {
        return { ...state, items: [...state.items, action.payload] };
      }
    }
    case REMOVE_PRODUCT: {
      return {
        ...state,
        items: state.items.filter((i: IIngredient) => i._id !== action.payload),
      };
    }
    case REORDER_PRODUCTS: {
      const items = [...state.items];
      items.splice(
        action.payload.to,
        0,
        items.splice(action.payload.from, 1)[0]
      );
      return {
        ...state,
        items,
      };
    }
    case RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
