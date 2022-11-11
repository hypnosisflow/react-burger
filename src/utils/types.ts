export type TIngredient = {
  item: {
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
  };
};

export interface IIgredient {
  _id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  image_large: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

export type TForm = {
  name?: string | undefined;
  password?: string | undefined;
  email?: string | undefined;
  token?: string;
  isChanged?: boolean;
};

export type TState = {
  location: string;
  background: any;
  from?: any
};

export type TIngredientProps = {
  ingredient: TIngredient;
  onClick: () => void;
  index: number;
};

export type TIngredientsProps = {
  data: TIngredient[];
  openModal?: Function;
  ref?: HTMLDivElement;
};

export type TConstructorProps = {
  item: TIngredient;
  index: number;
};

export type TGroupProps = {
  data: TIngredient[];
  group: string;
  onClick?: () => void;
  ref: any;
};

export type TModal = {
  closeModal: any,
  children?: React.ReactNode
}

export type TModalOverlay = {
  closeModal: any;
  children?: React.ReactNode;
};