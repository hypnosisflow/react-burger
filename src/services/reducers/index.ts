import { menuReducer } from "./menuReducer";
import { orderReducer } from "./orderReducer";
import { ingredientReducer } from "./ingredientReducer";
import { combineReducers } from "redux";
import { constructorReducer } from "./constructorReducer";
import { authReducer } from "./authReducers";
import { userReducer } from "./userReducer";
import { wsReducer } from "./wsReducer";

export type RootState = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
  menu: menuReducer,
  order: orderReducer,
  ingredient: ingredientReducer,
  cart: constructorReducer,
  auth: authReducer,
  user: userReducer,
  ws: wsReducer,
  userOrders: wsReducer
});
