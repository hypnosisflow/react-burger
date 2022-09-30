import { FETCH_FAILED, FETCH_SUCCESS, FETCH_REQUEST } from "../actions/fetch";
import { orderReducer } from "./orderReducer";
import { combineReducers } from "redux";

const initialState = {
  menu: [],
  menuRequest: false,
  menuFailed: false,

  constructorItems: [],
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
        menu: [...state.menu, ...action.menu.map(i => ({item: i, countItem: 0}))],
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
    case "ADD_PRODUCT": {
      const res = state.menu.map((i) => i.item)
      // console.log(res)
      const ingr = res.find((i) => i._id === action.payload);
      console.log(ingr, 'INGR')

      let newMenu = state.menu;
      let newCart = state.constructorItems;

      if (ingr.type === "bun") {
        // const hasBun = state.constructorItems.find((i) => i.type === "bun");
        // if (hasBun) {
        //   newItems = newItems.filter((i) => i.type !== "bun");
        //   newItems = [...newItems, { ...ingr }];
        //   newMenu = newMenu.map((i) => {
        //     if (i._id === hasBun._id) {
        //       return { ...i, countItem: +1 };
        //     } else {
        //       return i;
        //     }
        //   });
        // } else {
        //   newItems = [...newItems, { ...ingr }];
        // }
      } else {
        // const hasInConstructor = state.constructorItems.some(
        //   (i) => i._id === action.payload
        // );

        // if (hasInConstructor) {
        //   newCart = newCart.map((i) => {
        //     if (i._id === action.payload) {
        //       return { ...i};
        //     } else {
        //       return i;
        //     }
        //   });
        // } else {
          newCart = [...newCart, { ...ingr}];
        // }

        newMenu = newMenu.map((i) => {
          console.log(i)
          if (i._id === action.payload) {
            return {  item: {...i.item}, countItem: i.countItem + 1  }; // !!!
          } else {
            return i;
          }
          
        });
        
      }
      return { menu: newMenu, constructorItems: newCart };
    }

    case "REMOVE": {
      const ingr = state.constructorItems.find((i) => i._id === action.payload);
      let newMenu = state.menu;
      let newItems = state.constructorItems;

      if (ingr) {
        newItems = newItems.filter((i) => i._id !== action.payload);
      } else {
        newItems = newItems.map((i) => {
          if (i.id === action.payload) {
            return { ...i };
          } else {
            return i;
          }
        });
      }
      newMenu = newMenu.map((i) => {
        if (i.id === action.payload) {
          return { ...i };
        } else {
          return i;
        }
      });

      return { menu: newMenu, constructorItems: newItems };
    }
    default: {
      return state;
    }
  }
};

// const itemsInitialState = {
//   // constructorItems: [],
//   test: true,
// };

// export const itemsReducer = (state = itemsInitialState, action) => {
//   switch (action.type) {
//     // case "ADD_PRODUCT": {
//     //   // const ingr = state.menu.find(i => i._id === action.payload)
//     //   return {
//     //     ...state,
//     //     constructorItems: [...state.constructorItems, action.payload],

//     //   };
//     // }
//     // case "REMOVE": {
//     //   return {
//     //     ...state,
//     //     constructorItems: state.constructorItems.filter(
//     //       (i) => i !== action.payload
//     //     ),
//     //   };
//     // }
//     default: {
//       return state;
//     }
//   }
// };

export const rootReducer = combineReducers({
  menu: menuReducer,
  // items: itemsReducer,
  order: orderReducer,
});
// export const getMenu = state => state.menu;
// export const getMenuRequest = state => state.menuRequest;
// export const getMenuFaild = state => state.menuEmpty;
