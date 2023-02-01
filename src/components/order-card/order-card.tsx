import React, { FC, useMemo } from "react";

import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { useSelector } from "../../utils/store-type";
import { IIngredient, TOrderInfo } from "../../utils/types";

import styles from "./order-card.module.css";

interface TOrderCardProps {
  order: TOrderInfo;
}

export const OrderCard: FC<TOrderCardProps> = ({ order }) => {
  const { _id, name, ingredients, number, createdAt, status } = order;

  const match = useRouteMatch();
  const location = useLocation();

  const { menu } = useSelector((state) => state.menu);
  const menuIngredients = menu.map((item) => item.item);

  const maxIngredients = 6;

  // ings ids -> full ings
  const orderWithFullIngredients = ingredients.map((id) => {
    return menuIngredients.find((item) => item._id === id)!;
  });
  const date = new Date(createdAt);

  const totalPrice =
    orderWithFullIngredients.reduce((acc, i) => acc + i.price, 0) ?? null;

  const ingredientsToShow = orderWithFullIngredients.slice(0, maxIngredients);
  const ingredientsRemains =
    orderWithFullIngredients.length > maxIngredients
      ? orderWithFullIngredients.length - maxIngredients
      : null;

  const statusTranslated = () => {
    if (status === "done") {
      return <span>ВЫПОЛНЕН</span>;
    } else if (status === "pending") {
      return <span>ГОТОВИТСЯ</span>;
    }
  };

  const stylesName = `${styles.name} text text_type_main_medium mt-6 mb-6`;
  const stylesPrice = `${styles.price} text text_type_digits-default`;
  const stylesRemains = `${styles.remains} text text_type_digits-default`;

  // debugger;

  return (
    <Link
      to={{
        pathname: `${match.path}/${number}`,
        state: { background: location },
      }}
      className={styles.link}
    >
      <div className={styles.card}>
        <div className={styles.title}>
          <span className="text text_type_digits-default">{number}</span>
          <span className="text text_type_main_default text_color_inactive">
            <FormattedDate date={date} />
          </span>
        </div>
        <div className={styles.header}>
          <span className={stylesName}> {name} </span>
          {match?.path === "/profile/orders" && (
            <span className={styles.status}>{statusTranslated()}</span>
          )}
        </div>
        <div className={styles.details}>
          <ul className={styles.images}>
            {ingredientsToShow.length > 0 &&
              ingredientsToShow.map((item, index) => {
                return (
                  <li className={styles.list_image} key={index}>
                    <img
                      className={styles.image}
                      src={item.image_mobile}
                      alt="ing"
                    />
                    {maxIngredients === index + 1 ? (
                      <span className={stylesRemains}>
                        {" "}
                        {ingredientsRemains !== null && ingredientsRemains > 0
                          ? `+${ingredientsRemains}`
                          : null}{" "}
                      </span>
                    ) : null}
                  </li>
                );
              })}
          </ul>
          <span className={styles.total}>
            <CurrencyIcon type="primary" />
            <p className={stylesPrice}>{totalPrice}</p>
          </span>
        </div>
      </div>
    </Link>
  );
};
