import React, { FC } from "react";

import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuid } from "uuid";
import styles from "./order-card.module.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../utils/store-type";
import { TOrderInfo } from "../../utils/types";

interface TOrderCardProps {
  order: TOrderInfo;
}

export const OrderCard: FC<TOrderCardProps> = ({ order }) => {
  const { _id, name, ingredients, number, createdAt } = order;

  const location = useLocation();

  const { menu } = useSelector((state: any) => state.menu);
  const menuIngredients = menu.map((item: any) => item.item);

  // ings ids -> full ings
  const items = ingredients.map((ingredient) => {
    return menuIngredients.find((item: any) => item._id === ingredient)!;
  });

  // get imgs
  const images = items.map((item) => item.image);

  const date = new Date(createdAt);

  const totalPrice = items.reduce((acc: any, i: any) => acc + i.price, 0);

  return (
    <Link
      to={{
        pathname: `/feed/${number}`,
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
            {images.map((link: string) => (
              <li key={uuid()}>
                <img className={styles.image} src={link} alt="ing" />
              </li>
            ))}
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
