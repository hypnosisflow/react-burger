import React, { useState, useEffect } from "react";
import styles from "./ingredients-group.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { dataType } from "../../utils/types";
import { useSelector, useDispatch } from "react-redux";

IngredientsGroup.propTypes = {
  // data: dataType.isRequired,
  open: PropTypes.func.isRequired,
  group: PropTypes.string.isRequired,
};

function IngredientsGroup({ data, group, open }) {
  const dispatch = useDispatch();

  const { menu } = useSelector((state) => state.menu);
  const { ...item } = useSelector((state) => state.menu);
  // console.log('item:', item )
  // console.log('menu', menu)

  const res = menu.map((i) => i.item)
  // console.log(res, 'RES ')

  const filteredItems = res.filter((item) => {
    return item.type === group;
  });
  // console.log(filteredItems, 'FILTERED')
  return (
    <ul className={styles.group}>
      {filteredItems.map((item) => (
        <li
          key={item._id}
          // onClick={() => open({ item, name: "ingredient" })}
          onClick={() =>
            dispatch(
              { type: "ADD_PRODUCT", payload: item._id },
              console.log(item._id)
            )
          }
          className={styles.item}
        >
          {/* {constructorItems.countItem &&  */}
          <Counter count={item.countItem} size="default" />
          {/* //  }  */}
          <img src={item.image} alt="ingredient" />
          <div className={styles.price}>
            <span className="text text_type_digits-default">{item.price}</span>
            <CurrencyIcon className={styles.icon} type="primary" />
          </div>
          <span className={styles.name}>{item.name}</span>
        </li>
      ))}
    </ul>
  );
}
export default IngredientsGroup;
