const initialState = {
  item: {},
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DETAILS": {
        return {...state.item}
    }

    default: {
      return state;
    }
  }
};
