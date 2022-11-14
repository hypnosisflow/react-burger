import React, { useState, useEffect, forwardRef, FC, LegacyRef } from "react";
import styles from "./ingredients-group.module.css";

import { ADD_DETAILS } from "../../services/actions/ingredient";

import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { useDispatch } from "react-redux";
import { TIngredientItem, TGroupProps } from "../../utils/types";

const IngredientsGroup: FC<TGroupProps> = forwardRef(
  ({ data, group }, ref: LegacyRef<HTMLUListElement>) => {
    const dispatch = useDispatch();
    const filteredItems = data.filter((item: TIngredientItem) => {
      return item.item.type === group;
    });

    return (
      <ul className={styles.group} ref={ref}>
        {filteredItems.map((ingredient: TIngredientItem, index: number) => {
          return (
            <BurgerIngredient
              onClick={() =>
                dispatch({ type: ADD_DETAILS, payload: ingredient })
              }
              ingredient={ingredient}
              key={ingredient.item._id}
              index={index}
            />
          );
        })}
      </ul>
    );
  }
);
export default IngredientsGroup;
