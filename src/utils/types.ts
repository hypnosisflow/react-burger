export type TIngredient = {
  item: {
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

export type TRes = {
  res:  string
  json: Function
  ok: string,
  err: any
}

export type TForm = {
  name: string, 
  password?: string,
  email?: string
}

