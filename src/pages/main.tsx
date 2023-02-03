import React from "react";

import BurgerIngredients from "../components/burger-ingredients/burger-ingredients"
import BurgerConstructor from "../components/burger-constructor/burger-constructor";

import { useSelector } from "../utils/store-type";
import styles  from './main.module.css'
export function MainPage() {
    const { menu } = useSelector((state) => state.menu);

  return (
    <div className={styles.wrap}>
      <BurgerIngredients data={menu} />
      <BurgerConstructor />
    </div>
  );
}
