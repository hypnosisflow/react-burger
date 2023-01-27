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
  id: string;
}

export const OrderHistoryDetails: FC = () => {
  const { id } = useParams<IIngredientDetailsParams>();
  const orderNumber = Number(id);
  const dispatch = useDispatch();
  const match = useRouteMatch("");

  // console.log(match?.path)

  const { menu } = useSelector((state) => state.menu);
  const menuIngredients = menu.map((item) => item.item);

  const order = useSelector((state) => {
    if (state.ws.orders.length) {
      return (
        state.ws.orders.find((order) => order.number === orderNumber) ?? null
      );
    }
    console.log(state.ws.orders.length);

    if (state.wsProfile.orders.length) {
      return (
        state.wsProfile.orders.find((order) => order.number === orderNumber) ??
        null
      );
    }
    console.log(state.wsProfile.orders.length);

    if (state.order.order?.[0].number === orderNumber) {
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

  const { name, ingredients, createdAt, status } = order;

  const unique = ingredients.filter((v, i, a) => a.indexOf(v) === i);

  const items: IIngredient[] = unique.map((ingredient: string) => {
    return menuIngredients.find(
      (item: IIngredient) => item._id === ingredient
    )!;
  });

  const date = new Date(createdAt);

  const totalPrice = items.reduce((acc, i) => acc + i.price, 0);

  const counter = ingredients.reduce(
    (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
    new Map()
  );

  const statusTranslated = () => {
    if (status === "done") {
      return <span>Выполнен</span>;
    } else if (status === "pending") {
      return <span>Готовится</span>;
    }
  };

  const stylesName = `${styles.name} text text_type_main-medium`;
  const stylesNumber = `${styles.count} text text_type_digits-default `;
  const stylesTotalPrice = `${styles.price_num} text text_type_digits-default`;

  return (
    <section className={styles.wrap}>
      {id && order && (
        <div className={styles.card}>
          <div className={styles.title}>
            <span className={stylesNumber}>{orderNumber}</span>
          </div>
          <div className={styles.header}>
            <span className={stylesName}> {name} </span>
            {match?.path === "/profile/orders/:id" && (
              <span className={styles.status}>{statusTranslated()}</span>
            )}
          </div>
          <div className={styles.details}>
            <div className={styles.images}>
              <span className="text text_type_main-default">Состав:</span>
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
                        <span className={styles.list_names}>{item.name}</span>
                      </div>
                      <span className={stylesNumber}>
                        {counter.get(item._id)} x {item.price}
                        <CurrencyIcon type="primary" />
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.total}>
            <span className="text text_type_main_default text_color_inactive">
              <FormattedDate date={date} />
            </span>
            <span className={styles.price}>
              <p className={stylesTotalPrice}>{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
