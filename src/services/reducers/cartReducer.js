import { ADD_PRODUCT, REMOVE_PRODUCT } from "../actions/constructor";

const initialState = {
  bun: {},
  items: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      if (action.payload.type === "bun") {
        return { ...state, bun: action.payload };
      } else {
        return { ...state, items: [...state.items, action.payload] };
      }
    }

    case "REMOVE": {
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    }

    case "REORDER": {
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

    case "RESET": {
      return initialState;
    }

    case "REMOVE_PRODUCT": {
      return {
        ...state,
        items: [
          ...state.items.slice(0, action.payload),
          ...state.items.slice(action.payload + 1)
        ]
      }
    }

    default: {
      return state;
    }
  }
};
