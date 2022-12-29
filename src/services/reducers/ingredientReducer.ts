import { TDetailsActions } from "../actions/menu";
import { ADD_DETAILS, REMOVE_DETAILS } from "../constants/menu";

export type TIngredientState = {
  item: object;
  modalOpen: boolean;
};

const initialState = {
  item: {},
  modalOpen: false,
};

export const ingredientReducer = (
  state = initialState,
  action: TDetailsActions
): TIngredientState => {
  switch (action.type) {
    case ADD_DETAILS: {
      return { ...state, item: action.payload, modalOpen: true };
    }
    case REMOVE_DETAILS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
