import React from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { dataType } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import {
  sumSelector,
  constructorSelector,
  menuSelector,
} from "../../services/selectors/selectors";
import { sendOrder } from "../../services/actions/fetch";

BurgerConstructor.propTypes = {
  // data: dataType.isRequired,
  openModal: PropTypes.func.isRequired,
};

function BurgerConstructor({  openModal }) {
  const dispatch = useDispatch();

  const sum = useSelector(sumSelector);
  const constructorItems = useSelector(constructorSelector);
  const data = useSelector(menuSelector)
  // console.log('data', data)

  const { ...bun } = useSelector((state) => state.cart.bun);

  function isEmptyObject(obj) {
    return JSON.stringify(obj) !== "{}";
  }

  const hasBun = isEmptyObject(bun);

  return (
    <section className={styles.constructorwrap}>
      {hasBun && (
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
        {constructorItems.map((item) => {
          return (
            <li
              key={item._id}
              className={styles.component}
              onClick={() => dispatch({ type: "REMOVE", payload: item })}
            >
              <DragIcon type="primary" />
              <ConstructorElement
                className={styles.list_item}
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
              />
            </li>
          );
        })}
      </ul>
      {hasBun && (
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
          <CurrencyIcon className={styles.icon} />
        </div>
        <Button
          // onClick={() => openModal({ name: "order" })}
          onClick={() => dispatch(sendOrder())}
          type="primary"
          size="medium"
        >
          ОФОРМИТЬ ЗАКАЗ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
