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

BurgerConstructor.propTypes = {
  data: dataType.isRequired,
  openModal: PropTypes.func.isRequired,
};

function BurgerConstructor({ data, openModal }) {
  return (
    <section className={styles.constructorwrap}>
      <div className={styles.top_item}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={data[0].name + " (верх)"}
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </div>
      <ul className={styles.list}>
        {data.slice(2).map((item) => {
          return (
            <li key={item._id} className={styles.component}>
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
      <div className={styles.last_item}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={data[0].name + " (низ)"}
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </div>
      <div className={styles.order}>
        <div className={styles.sum}>
          <p className="text text_type_digits-medium">897</p>
          <CurrencyIcon className={styles.icon} />
        </div>

        <Button
          onClick={() => openModal({ name: "order" })}
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
