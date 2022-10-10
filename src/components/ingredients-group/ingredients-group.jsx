import React, { useState, useEffect, forwardRef } from "react";
import styles from "./ingredients-group.module.css";

import PropTypes from "prop-types";
import { dataType } from "../../utils/types";

import BurgerIngredient from "../burger-ingredient/burger-ingredient";

// IngredientsGroup.propTypes = {
//   data: dataType.isRequired,
//   group: PropTypes.string.isRequired,
// };

const IngredientsGroup = forwardRef(({ data, group }, ref) => {
  const filteredItems = data.filter((item) => {
    return item.item.type === group;
  });

  return (
    <ul className={styles.group} ref={ref}>
      {filteredItems.map((item) => (
        <BurgerIngredient ingredient={item} key={item._id} />
      ))}
    </ul>
  );
});
export default IngredientsGroup;
