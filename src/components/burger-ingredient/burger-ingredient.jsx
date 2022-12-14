import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { useDispatch, useSelector } from "react-redux";
import {  countSelector } from "../../services/selectors/selectors";
import { useDrag } from "react-dnd/dist/hooks";

function BurgerIngredient({ ingredient }) {
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
    <div ref={drag} >
      <li
        key={ingredient._id}
        onClick={() => dispatch({ type: "ADD_DETAILS", payload: ingredient})}
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
          <CurrencyIcon className={styles.icon} type="primary" />
        </div>
        <span className={styles.name}>{ingredient.item.name}</span>
      </li>
    </div>
  );
}

export default BurgerIngredient;
