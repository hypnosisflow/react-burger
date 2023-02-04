import React, { SyntheticEvent, useCallback, useState, useEffect } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory } from "react-router-dom";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "../../utils/store-type";
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

const BurgerConstructor = () => {
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const orderNumber = useSelector((state) => state.order.orderNumber);
  const sum = useSelector(sumSelector);
  const ingredients = useSelector(constructorSelector);
  const hasBuns = useSelector(hasBun);

  const bun = useSelector((state) => state.cart.bun);
  const user = useSelector((state) => state.auth.user);

  const [{ canDrop, isOver, dragItem }, drop] = useDrop(() => ({
    accept: "MENU_INGREDIENT",
    drop: (item: TIngredientItem) => dispatch(addToConstructor(item.item)),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      dragItem: monitor.getItem(),
    }),
  }));

  const closeHandle = () => {
    dispatch({ type: ORDER_RESET})
    setProcessing(false)
  }


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
        setProcessing(true);
        dispatch(sendOrder());
      } else {
        history.push("/login");
      }
    },
    [user, dispatch, history, processing]
  );

  return (
    <section ref={drop} className={styles.constructorwrap}>
      {hasBuns && bun && (
        <div className={styles.top_item}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <ul className={styles.list}>
        {ingredients.length && bun ? (
          ingredients.map((item, index) => {
            return (
              <ConstructorIngredient item={item} key={item.id} index={index} />
            );
          })
        ) : (
          <div style={{ backgroundColor }} className={styles.no_products}>
            ВЫБЕРИТЕ ИНГРИДЕНТЫ
          </div>
        )}
      </ul>

      {hasBuns && bun && (
        <div className={styles.last_item}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <div className={styles.order}>
        <div className={styles.sum}>
          <p className="text text_type_digits-medium">{sum}</p>
          <CurrencyIcon type={"primary"} />
        </div>
        {processing ? (
          <Button
            htmlType="button"
            onClick={send}
            type="primary"
            size="medium"
            disabled
          >
            Отправка...
          </Button>
        ) : (
          <Button htmlType="button" onClick={send} type="primary" size="medium">
            ОФОРМИТЬ ЗАКАЗ
          </Button>
        )}
      </div>
      {orderNumber > 0 && (
        <Modal closeModal={() => closeHandle()}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
