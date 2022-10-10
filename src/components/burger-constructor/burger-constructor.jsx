import React from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import { dataType } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import {
  sumSelector,
  constructorSelector,
  hasBun,
} from "../../services/selectors/selectors";
import { ORDER_RESET, sendOrder } from "../../services/actions/order";
import { useDrop } from "react-dnd";
import { addToConstructor } from "../../services/actions/constructor";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";

// BurgerConstructor.propTypes = {
//   // data: dataType.isRequired,
//   openModal: PropTypes.func.isRequired,
// };

function BurgerConstructor({ openModal, onDropHandler }) {
  const dispatch = useDispatch();
  const orderNumber = useSelector((state) => state.order.orderNumber);
  const sum = useSelector(sumSelector);
  const ingredients = useSelector(constructorSelector);
  const buns = useSelector(hasBun);
  const { ...bun } = useSelector((state) => state.cart.bun);
 

  const [{ canDrop, isOver, dragItem }, drop] = useDrop(() => ({
    accept: "MENU_INGREDIENT",
    drop: (item) => dispatch(addToConstructor(item.item)),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      dragItem: monitor.getItem(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = "black";
  if (isActive) {
    backgroundColor = "indigo";
  } else if (canDrop) {
    backgroundColor = "#111";
  }

  return (
    <section ref={drop} className={styles.constructorwrap}>
      {buns && (
        <div className={styles.top_item} >
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      ) }
      {/* <div style={{ backgroundColor }}> */}
        <ul  className={styles.list}>
          {ingredients.length || buns > 0 ? (
            ingredients.map((item, index) => {
              return (
                <ConstructorIngredient item={item} key={item.id} index={index} />
              );
            })
          ) : (
            <div style={{backgroundColor}} className={styles.no_products}>ВЫБЕРИТЕ ИНГРИДЕНТЫ</div>
          )}
        </ul>
      {/* </div> */}

      {buns && (
        <div className={styles.last_item}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      ) }
      <div className={styles.order}>
        <div className={styles.sum}>
          <p className="text text_type_digits-medium">{sum}</p>
          <CurrencyIcon className={styles.icon} />
        </div>
        <Button
          onClick={() => dispatch(sendOrder())}
          type="primary"
          size="medium"
        >
          ОФОРМИТЬ ЗАКАЗ
        </Button>
      </div>
      {orderNumber > 0 && (
        <Modal closeModal={() => dispatch({ type: ORDER_RESET })}>
          <OrderDetails number={orderNumber} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
