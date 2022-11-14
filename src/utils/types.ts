
import * as H from 'history';
import { Ref } from 'react';


export type TIngredientItem = {
  item: IIngredient
};

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string,
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

export interface IProtectedRouteProps {
  auth?: boolean;
  children: React.ReactNode;
  path: string;
  exact: boolean;
}

export type TForm = {
  name?: string;
  password?: string;
  email?: string;
  token?: string;
  isChanged?: boolean;
};

export type TState = {
  location: H.Location;
  background: H.Location;
  from: H.LocationDescriptor;
}

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
  item: TIngredientItem;
  index: number;
};

export type TGroupProps = {
  data: TIngredientItem[];
  group: string;
  onClick?: () => void;
  ref: Ref<HTMLUListElement> ;
};

export type TModal = {
  closeModal: any;
  children?: React.ReactNode;
};

export type TModalOverlay = {
  closeModal: any;
  children?: React.ReactNode;
};
