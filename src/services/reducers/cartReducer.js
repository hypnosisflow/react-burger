const initialState = {
  bun: {},

  items: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      
      if (action.payload.type === "bun") {
        return { ...state, bun: action.payload };
      } else {
        return { ...state, items: [...state.items, action.payload] };
      }
    }

    case "REMOVE": {
      return { ...state, items: state.items.filter((i) => i !== action.payload) };
    }
    default: {
      return state;
    } 
  }
};
