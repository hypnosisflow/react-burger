import React from "react";

import BurgerIngredients from "../components/burger-ingredients/burger-ingredients"
import BurgerConstructor from "../components/burger-constructor/burger-constructor";

import { useSelector } from "../utils/store-type";

export function MainPage() {
  //@ts-ignore
    const { menu } = useSelector((state) => state.menu);

  return (
    <>
      <BurgerIngredients data={menu} />
      <BurgerConstructor />
    </>
  );
}
