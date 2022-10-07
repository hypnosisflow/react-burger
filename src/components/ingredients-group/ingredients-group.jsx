import React, { useState, useEffect, useMemo } from "react";
import styles from "./ingredients-group.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { dataType } from "../../utils/types";
import { useSelector, useDispatch } from "react-redux";
import { cartSelector } from "../../services/selectors/selectors";
import { addToConstructor } from '../../services/actions/constructor'

IngredientsGroup.propTypes = {
  // data: dataType.isRequired,
  open: PropTypes.func.isRequired,
  group: PropTypes.string.isRequired,
};

function IngredientsGroup({ data, group, open }) {
  const dispatch = useDispatch();

  const res = useSelector(cartSelector);

  const filteredItems = data.filter((item) => {
    return item.item.type === group;
  });

  return (
    <ul className={styles.group}>
      {filteredItems.map((item) => (
        <li
          key={item._id}
          // onClick={() => dispatch({ type: "ADD_DETAILS", payload: item})}
          // onClick={() => dispatch({ type: "ADD_PRODUCT", payload: item.item })}
          onClick={() => dispatch(addToConstructor(item.item))}
          className={styles.item}
        >
          {res.get(item.item._id) && (
            <Counter count={res.get(item.item._id)} size="default" />
          )}
          <img src={item.item.image} alt="ingredient" />
          <div className={styles.price}>
            <span className="text text_type_digits-default">
              {item.item.price}
            </span>
            <CurrencyIcon className={styles.icon} type="primary" />
          </div>
          <span className={styles.name}>{item.item.name}</span>
        </li>
      ))}
    </ul>
  );
}
export default IngredientsGroup;
