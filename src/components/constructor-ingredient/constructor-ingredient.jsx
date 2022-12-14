import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import styles from "./constructor-ingredient.module.css";
import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { hover } from "@testing-library/user-event/dist/hover";
import { REMOVE_PRODUCT, REORDER_PRODUCTS } from '../../services/actions/constructor'
function ConstructorIngredient({ item, index }) {
  const dispatch = useDispatch();

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ["INGREDIENT"],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      dispatch({
        type: REORDER_PRODUCTS,
        payload: {
          from: dragIndex,
          to: hoverIndex,
        },
      });
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "INGREDIENT",
    item: () => {
      return { item, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div>
      <li
        key={item.id}
        className={styles.component}
        style={{ opacity }}
        data-handler-id={handlerId}
        ref={ref}
      >
        <DragIcon type="primary" />
        <ConstructorElement
          className={styles.list_item}
          text={item.name}
          price={item.price}
          thumbnail={item.image_mobile}
          handleClose={() => dispatch({ type: REMOVE_PRODUCT, payload: item.id })}
        />
      </li>
    </div>
  );
}

export default ConstructorIngredient;
