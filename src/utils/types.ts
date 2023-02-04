import * as H from "history";
import { Ref } from "react";

export type TIngredientItem = {
  _id?: IIngredient;
  item: IIngredient;
};

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  to: number;
  from: number;
}


export type TForm = {
  user?: {};
  name?: string;
  password?: string;
  email?: string;
  token?: string;
  isChanged?: boolean;
  readonly refreshToken?: string;
  readonly accessToken?: string;
};

export type TState = {
  location: H.Location;
  background: H.Location;
  from: H.LocationDescriptor;
};

export type TIngredientProps = {
  ingredient: TIngredientItem;
  onClick: () => void;
  index: number;
};

export type TIngredientsProps = {
  data: TIngredientItem[];
  openModal?: Function;
  ref?: HTMLDivElement;
};

export type TConstructorProps = {
  item: IIngredient;
  index: number;
};

export type TGroupProps = {
  data: TIngredientItem[];
  group: string;
  onClick?: () => void;
  ref: Ref<HTMLUListElement>;
};

export type TModal = {
  closeModal: () => void;
  children?: React.ReactNode;
};

export type TModalOverlay = {
  closeModal: () => void ;
  children?: React.ReactNode;
};

export type TOrderInfo = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};
