import React, { FC, useEffect } from "react";
import { useParams, useRouteMatch } from "react-router";
import { useDispatch, useSelector } from "../../utils/store-type";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { orderRequest } from "../../services/actions/order";
import { v4 as uuid } from "uuid";
import { IIngredient } from "../../utils/types";
import styles from "./order-history-details.module.css";

interface IIngredientDetailsParams {
  number: string;
}

export const OrderHistoryDetails: FC = () => {
  const { number } = useParams<IIngredientDetailsParams>();
  const orderNumber = Number(number);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const { menu } = useSelector((state: any) => state.menu);
  const menuIngredients = menu.map((item: any) => item.item);

  const order = useSelector((state) => {
    if (state.ws.orders.length) {
      return (
        state.ws.orders.find((order) => order.number === orderNumber) ?? null
      );
    }
    if (state.order.order?.[0].number === orderNumber) {
      return state.order.order[0];
    }

    if (
      match.path === "/profile/orders/:number" &&
      state.wsProfile.orders.length
    ) {
      return state.wsProfile.orders.find(
        (order) => order.number === orderNumber
      );
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

  const { name, ingredients, createdAt } = order;

  const items: IIngredient[] = ingredients.map((ingredient: string) => {
    return menuIngredients.find(
      (item: IIngredient) => item._id === ingredient
    )!;
  });

  const date = new Date(createdAt);

  const totalPrice = items.reduce((acc, i) => acc + i.price, 0);

  const counter = ingredients.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

  return (
    <section>
      {number && order && (
        <div className={styles.card}>
          <div className={styles.title}>
            <span>{number}</span>
          </div>
          <h4> {name} </h4>
          <div className={styles.details}>
            <div className={styles.images}>
            СОСТАВ:

              <ul className={styles.list}>
                {items.map((item) => (
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
                      <span className={styles.count}>{counter.get(item._id)} {item.price}</span>
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
