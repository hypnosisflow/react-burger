import React, { useState, useEffect, forwardRef } from "react";
import styles from "./ingredients-group.module.css";

import PropTypes from "prop-types";
import { dataType } from "../../utils/types";

import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { useDispatch } from "react-redux";

// IngredientsGroup.propTypes = {
//   data: dataType.isRequired,
//   group: PropTypes.string.isRequired,
// };

const IngredientsGroup = forwardRef(({ data, group }, ref) => {
  const dispatch = useDispatch();
  const filteredItems = data.filter((item) => {
    return item.item.type === group;
  });

  return (
    <ul className={styles.group} ref={ref}>
      {filteredItems.map((ingredient) => (
        <BurgerIngredient
          onClick={() => dispatch({ type: "ADD_DETAILS", payload: ingredient })}
          ingredient={ingredient}
          key={ingredient._id}
          id={ingredient._id}
        
        />
      ))}
    </ul>
  );
});
export default IngredientsGroup;
