import React, { FC } from "react";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import styles from "./constructor-ingredient.module.css";
import { useRef } from "react";
import { useDrop, useDrag, XYCoord } from "react-dnd";
import { hover } from "@testing-library/user-event/dist/hover";
import {
  REMOVE_PRODUCT,
  REORDER_PRODUCTS,
} from "../../services/actions/constructor";
import { TIngredient } from "../../utils/types";

type TConstructorProps = {
  item: TIngredient;
  index: number;
};

const ConstructorIngredient: FC<TConstructorProps> = ({ item, index }) => {
  const dispatch = useDispatch();

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ["INGREDIENT"],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      //@ts-ignore
      const hoverBoundingRect: DOMRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      //@ts-ignore
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
        key={item.item._id}
        className={styles.component}
        style={{ opacity }}
        data-handler-id={handlerId}
        ref={ref}
      >
        <DragIcon type="primary" />
        <ConstructorElement
          text={item.item.name}
          price={item.item.price}
          thumbnail={item.item.image_mobile}
          handleClose={() =>
            dispatch({ type: REMOVE_PRODUCT, payload: item.item._id })
          }
        />
      </li>
    </div>
  );
};

export default ConstructorIngredient;
