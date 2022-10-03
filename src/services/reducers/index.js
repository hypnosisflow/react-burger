import { FETCH_FAILED, FETCH_SUCCESS, FETCH_REQUEST } from "../actions/fetch";
import { orderReducer } from "./orderReducer";
import { ingredientReducer } from "./ingredientReducer";
import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";

const initialState = {
  menu: [],
  menuRequest: false,
  menuFailed: false,

  // constructorItems: [],
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
    // case "ADD_PRODUCT": {
    //   const ingrIndex = state.menu.findIndex(
    //     (i) => i.item._id === action.payload
    //   );
    //   const ingr = state.menu[ingrIndex];
    //   let newMenu = state.menu;
    //   let newCart = state.constructorItems;

    //   if (ingr.item.type === "bun") {
    //     const hasBun = state.constructorItems.find((i) => i.type === "bun");

    //     if (hasBun) {
    //       newCart = newCart.filter((i) => i.type !== "bun");
    //       newCart = [...newCart, { ...ingr.item }];
    //       newMenu = newMenu.map((i) => {
    //         if (i._id === hasBun._id) {
    //           return { ...i, countItem: +1 };
    //         } else {
    //           return i;
    //         }
    //       });
    //     } else {
    //       newCart = [...newCart, { ...ingr.item }];
    //     }
    //   } else {
    //     newCart = [...newCart, { ...ingr.item }];

    //     const first = state.menu.slice(0, ingrIndex);
    //     let last = [];

    //     if (ingrIndex !== state.menu.length - 1) {
    //       last = state.menu.slice(ingrIndex + 1);
    //     }
    //     console.log(last, 'last')

    //     newMenu = [
    //       ...first,
    //       { ...ingr, countItem: ingr.countItem + 1 },
    //       ...last,
    //     ];
    //   }
    //   return { menu: newMenu, constructorItems: newCart };
    // }

    // case "REMOVE": {
    //   const ingr = state.constructorItems.find((i) => i === action.payload);
    //   console.log(ingr)
  
    //   let newMenu = state.menu;
    //   let newCart = state.constructorItems;

    //   if (ingr) {
    //     newCart = newCart.filter((i) => i !== action.payload);
    //   } 
    //   // else {
    //   //   newCart = newCart.map((i) => {
    //   //     if (i.id === action.payload) {
    //   //       return { ...i };
    //   //     } else {
    //   //       return i;
    //   //     }
    //   //   });
    //   // }
    //   newMenu = newMenu.map((i) => {
    //     if (i._id === ingr._id) {
    //       return { ...i, countItem: i.countItem - 1};
    //     } else {
    //       return i;
    //     }
    //   });

    //   return { menu: newMenu, constructorItems: newCart };
    // }
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
