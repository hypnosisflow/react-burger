import { wsProfileReducer } from './wsProfileReducer';
import { menuReducer } from "./menuReducer";
import { orderReducer } from "./orderReducer";
import { ingredientReducer } from "./ingredientReducer";
import { combineReducers } from "redux";
import { constructorReducer } from "./constructorReducer";
import { authReducer } from "./authReducers";
import { userReducer } from "./userReducer";
import { wsReducer } from "./wsReducer";


export const reducer = combineReducers({
  menu: menuReducer,
  order: orderReducer,
  ingredient: ingredientReducer,
  cart: constructorReducer,
  auth: authReducer,
  // user: userReducer,
  ws: wsReducer,
  wsProfile: wsProfileReducer
});
