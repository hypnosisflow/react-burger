import React, { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "../../utils/store-type";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./order-history-details.module.css";
import { orderRequest } from "../../services/actions/order";
import { v4 as uuid } from "uuid";
interface IIngredientDetailsParams {
  number: string;
}

export const OrderHistoryDetails: FC = () => {
  const { number } = useParams<IIngredientDetailsParams>();
  const orderNumber = Number(number);
  const dispatch = useDispatch();

  const { menu } = useSelector((state: any) => state.menu);
  const menuIngredients = menu.map((item: any) => item.item);

  const order = useSelector((state) => {
    if (state.ws.orders.length) {
      return (
        state.ws.orders.find((order) => order.number === orderNumber) ?? null
      );
    }
    //@ts-ignore
    if (state.order.order?.[0].number === orderNumber) {
      //@ts-ignore
      return state.order.order[0];
    }
    return null;
  });

  useEffect(() => {
    if (!order) {
      dispatch(orderRequest(orderNumber));
    }
  }, [dispatch, order, orderNumber]);

  if (!order) {
    return <h1>Загрузка...</h1>;
  }

  const { _id, name, ingredients, createdAt } = order;

  const items = ingredients.map((ingredient: any) => {
    return menuIngredients.find((item: any) => item._id === ingredient)!;
  });

  // get imgs
  const images = items.map((item: any) => item.image);

  const date = new Date(createdAt);

  const totalPrice = items.reduce((acc: any, i: any) => acc + i.price, 0);

  return (
    <section>
      {order && (
        <div className={styles.card}>
          <div className={styles.title}>
            <span>{number}</span>
          </div>
          <h4> {name} </h4>
          <div className={styles.details}>
            <div className={styles.images}>
              <ul className={styles.list}>
                СОСТАВ:
                {items.map((item: any) => (
                  <li className={styles.list_item} key={uuid()}>
                    <div className={styles.ingredient_item}>
                      <div className={styles.item_descr}>
                        <img
                          className={styles.image}
                          src={item.image}
                          alt="ing"
                        />
                        <span>{item.name}</span>
                      </div>
                      <span className={styles.count}>{item.price}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.total}>
            <span>
              <FormattedDate date={date} />
            </span>
            <span className={styles.price}>
              <CurrencyIcon type="primary" />
              <p className={styles.price_num}>{totalPrice}</p>
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
