import React, { FC } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../utils/store-type";
import styles from "./constructor-ingredient.module.css";
import { useRef } from "react";
import { useDrop, useDrag, XYCoord } from "react-dnd";
import {
  REMOVE_PRODUCT,
  REORDER_PRODUCTS,
} from "../../services/constants/constructor";
import { IIngredient } from "../../utils/types";

interface DraggableItemInterface {
  item: IIngredient;
  index: number;
}

const ConstructorIngredient: FC<DraggableItemInterface> = ({ item, index }) => {
  const dispatch = useDispatch();

  const ref = useRef<HTMLLIElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ["INGREDIENT"],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    hover(item, monitor) {
      const dragIndex = (item as DraggableItemInterface).index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect() as DOMRect;
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset() as XYCoord;
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
      (item as DraggableItemInterface).index = hoverIndex;
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
        key={item._id}
        className={styles.component}
        style={{ opacity }}
        data-handler-id={handlerId}
        ref={ref}
      >
        <DragIcon type="primary" />
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image_mobile}
          handleClose={() =>
            dispatch({ type: REMOVE_PRODUCT, payload: item._id })
          }
        />
      </li>
    </div>
  );
};

export default ConstructorIngredient;
