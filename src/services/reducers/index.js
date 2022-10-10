import { menuReducer } from "./menuReducer";
import { orderReducer } from "./orderReducer";
import { ingredientReducer } from "./ingredientReducer";
import { combineReducers } from "redux";
import { constructorReducer } from "./constructorReducer";

export const rootReducer = combineReducers({
  menu: menuReducer,
  order: orderReducer,
  ingredient: ingredientReducer,
  cart: constructorReducer,
});
