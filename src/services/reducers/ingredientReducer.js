const initialState = {
  item: {},

  modalOpen: false 
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DETAILS": {
        return {...state, item: action.payload, modalOpen: true}
    }
    case "REMOVE_DETAILS" : {
      return { ...state, item: {} , modalOpen: false}
    }
    default: {
      return state;
    } 
  }
};
