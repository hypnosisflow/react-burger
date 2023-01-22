import React, { FC } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { useDispatch, useSelector } from "../../utils/store-type";
import { countSelector } from "../../services/selectors/selectors";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { TIngredientProps, TState } from "../../utils/types";

const BurgerIngredient: FC<TIngredientProps> = ({ ingredient }) => {
  const location = useLocation<TState>();
  const dispatch = useDispatch();
  const res = useSelector(countSelector);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "MENU_INGREDIENT",
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  return (
    // <div ref={drag}>
    <Link
      className={styles.link}
      to={{
        pathname: `/ingredients/${ingredient.item._id}`,
        state: { background: location },
      }}
      ref={drag}
    >
      <li
        key={ingredient.item._id}
        onClick={() => dispatch({ type: "ADD_DETAILS", payload: ingredient })}
        className={styles.item}
      >
        {res.get(ingredient.item._id) && (
          <Counter count={res.get(ingredient.item._id)} size="default" />
        )}
        <img src={ingredient.item.image} alt="ingredient" />
        <div className={styles.price}>
          <span className="text text_type_digits-default">
            {ingredient.item.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <span className={styles.name}>{ingredient.item.name}</span>
      </li>
    </Link>
    // </div>
  );
};

export default BurgerIngredient;
