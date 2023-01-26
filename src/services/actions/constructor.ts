import { v4 as uuid } from "uuid";

import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  REORDER_PRODUCTS,
  RESET,
} from "../constants/constructor";
import { IIngredient } from "../../utils/types";

export type TAddProductAction = {
  readonly type: typeof ADD_PRODUCT;
  readonly payload: IIngredient;
  readonly id?: string;
};

export type TRemoveProductAction = {
  readonly type: typeof REMOVE_PRODUCT;
  readonly payload: string;
};

export type TReorderPoductsAction = {
  readonly type: typeof REORDER_PRODUCTS;
  readonly payload: {
    from: number;
    to: number;
  };
};

export type TResetAction = {
  readonly type: typeof RESET;
};

export type TConstructorActions =
  | TAddProductAction
  | TRemoveProductAction
  | TReorderPoductsAction
  | TResetAction;

export const addToConstructor = (ingredient: IIngredient) => {
  return {
    type: ADD_PRODUCT,
    payload: {
      ...ingredient,
      id: uuid(),
    },
  };
};
