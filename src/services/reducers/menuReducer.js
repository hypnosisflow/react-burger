import { FETCH_FAILED, FETCH_SUCCESS, FETCH_REQUEST } from "../actions/menu";

const initialState = {
    menu: [],
    menuRequest: false,
    menuFailed: false,
    menuSuccess: false
  };
  
  export const menuReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_REQUEST: {
        return {
          ...state,
          menuRequest: true,
          menuSuccess: false
        };
      }
      case FETCH_SUCCESS: {
        return {
          ...state,
          menu: [...state.menu, ...action.menu.map((i) => ({ item: i }))],
          menuRequest: false,
          menuFailed: false,
          menuSuccess: true
        };
      }
      case FETCH_FAILED: {
        return {
          ...state,
          menu: [],
          menuFailed: true,
          menuRequest: false,
          menuSuccess: false
        };
      }
      default: {
        return state;
      }
    }
  };