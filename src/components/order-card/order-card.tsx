import React, { FC } from "react";

import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { useSelector } from "../../utils/store-type";
import { TOrderInfo } from "../../utils/types";

import styles from "./order-card.module.css";

interface TOrderCardProps {
  order: TOrderInfo;
}

export const OrderCard: FC<TOrderCardProps> = ({ order }) => {
  const { _id, name, ingredients, number, createdAt } = order;

  const match = useRouteMatch();
  const location = useLocation();

  const { menu } = useSelector((state: any) => state.menu);
  const menuIngredients = menu.map((item: any) => item.item);

  const maxIngredients = 6;

  // ings ids -> full ings
  const items = ingredients.map((ingredient) => {
    return menuIngredients.find((item: any) => item._id === ingredient)!;
  });

  // get imgs
  const images = items.map((item) => item.image);

  const date = new Date(createdAt);

  const totalPrice = items.reduce((acc: any, i: any) => acc + i.price, 0);

  const ingredientsToShow = items.slice(0, maxIngredients);
  const ingredientsRemains =
    items.length > maxIngredients ? items.length - maxIngredients : null;

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
          <span>{number}</span>
          <span>
            <FormattedDate date={date} />
          </span>
        </div>
        <h4> {name} </h4>
        <div className={styles.details}>
          <ul className={styles.images}>
            {ingredientsToShow.map((item, index) => {
              return (
                <li className={styles.list_image} key={index} >
                  <img
                    className={styles.image}
                    src={item.image_mobile}
                    alt="ing"
                  />
                  {maxIngredients === index + 1 ? (
                    <span className={styles.remains}>
                      {" "}
                      {/* @ts-ignore */}
                      {ingredientsRemains > 0
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
            <p className={styles.price}>{totalPrice}</p>
          </span>
        </div>
      </div>
    </Link>
  );
};
