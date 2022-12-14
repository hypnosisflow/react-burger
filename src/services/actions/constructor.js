import { v4 as uuid } from "uuid";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const REORDER_PRODUCTS = "REORDER_PRODUCTS";
export const RESET = 'RESET'

export const addToConstructor = (ingredient) => {
  return {
    type: ADD_PRODUCT,
    payload: {
      ...ingredient,
      id: uuid(),
    },
  };
};
