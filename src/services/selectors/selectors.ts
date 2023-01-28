import { IIngredient } from "../../utils/types";
import { TConstructorState } from "../reducers/constructorReducer";

interface ICartProps {
  cart: TConstructorState
}

export const hasBun = (state: ICartProps) => {
  const bun = state.cart.bun;
  function isEmptyObject(obj: IIngredient | null) {
    return JSON.stringify(obj) !== "null";
  }
  const hasBunInCart = isEmptyObject(bun);
  return hasBunInCart;
};

export const sumSelector = (state: ICartProps) => {
  let value = 0;
  let bunValue = 0;
  let total = 0;
  const bun = state.cart.bun;
  const bunPrice = state.cart.bun?.price as number; 

  if (bun && bun.price) {
    bunValue += bunPrice * 2;
    return bunValue
  }

  state.cart.items.forEach((el) => {
    if (el && el.price) {
      value += el.price;
      return value;
    } else {
      return;
    }
  });

  return (total += bunValue + value || 0);
};

export const constructorSelector = (state: ICartProps) => {
  const items = state.cart.items.filter((i) => i.type !== "bun");
  return items;
};

//
export const countSelector = (state: ICartProps) => {
  const ingredients = state.cart.items;
  const bunId = state.cart.bun?._id;

  let res = new Map();

  ingredients.reduce(
    (acc, e) => acc.set(e._id, (acc.get(e._id) || 0) + 1),
    res
  );
  
  if (bunId) {
    res.set(bunId, 2);
  }

  return res;
};
