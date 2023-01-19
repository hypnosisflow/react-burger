import React, { SyntheticEvent, useCallback } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory } from "react-router-dom";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  sumSelector,
  constructorSelector,
  hasBun,
} from "../../services/selectors/selectors";
import { sendOrder } from "../../services/actions/order";
import { ORDER_RESET } from "../../services/constants/order";
import { useDrop } from "react-dnd";
import { addToConstructor } from "../../services/actions/constructor";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";
import { TIngredientItem } from "../../utils/types";
import { TState } from "../../services/reducers/constructorReducer";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // @ts-ignore
  const orderNumber = useSelector((state) => state.order.orderNumber);
  const sum = useSelector(sumSelector);
  const ingredients = useSelector(constructorSelector);
  const bun = useSelector(hasBun);
  // @ts-ignore
  const { ...buns } = useSelector((state) => state.cart.bun);
  //@ts-ignore
  const user = useSelector((state) => state.auth.user);

  const [{ canDrop, isOver, dragItem }, drop] = useDrop(() => ({
    accept: "MENU_INGREDIENT",
    drop: (item: any) => dispatch(addToConstructor(item.item)),
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

  const send = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (user) {
        dispatch(sendOrder());
      } else {
        history.push("/login");
      }
    },
    [user, dispatch, history]
  );

  return (
    <section ref={drop} className={styles.constructorwrap}>
      {bun && (
        <div className={styles.top_item}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={buns.name + " (верх)"}
            price={buns.price}
            thumbnail={buns.image}
          />
        </div>
      )}
      {/* <div style={{ backgroundColor }}> */}
      <ul className={styles.list}>
        {ingredients.length || bun ? (
          ingredients.map((item: any, index: number) => {
            return (
              <ConstructorIngredient item={item} key={item._id} index={index} />
            );
          })
        ) : (
          <div style={{ backgroundColor }} className={styles.no_products}>
            ВЫБЕРИТЕ ИНГРИДЕНТЫ
          </div>
        )}
      </ul>
      {/* </div> */}

      {bun && (
        <div className={styles.last_item}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={buns.name + " (верх)"}
            price={buns.price}
            thumbnail={buns.image}
          />
        </div>
      )}
      <div className={styles.order}>
        <div className={styles.sum}>
          <p className="text text_type_digits-medium">{sum}</p>
          <CurrencyIcon type={"primary"} />
        </div>
        <Button htmlType="button" onClick={send} type="primary" size="medium">
          ОФОРМИТЬ ЗАКАЗ
        </Button>
      </div>
      {orderNumber > 0 && (
        <Modal closeModal={() => dispatch({ type: ORDER_RESET })}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
