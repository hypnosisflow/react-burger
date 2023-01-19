import React, { FC } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./order-card.module.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "../../utils/hooks";

export const OrderCard: FC<any> = ({
  _id,
  name,
  ingredients,
  number,
  createdAt,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { menu } = useSelector((state: any) => state.menu);
  const menuIngredients = menu.map((item: any) => item.item);

  const elements = ingredients ? ingredients : null;

  const intersection = menuIngredients.map((item: any) =>
    elements.includes(item._id) ? item : null
  );
  const images = intersection
    .map((item: any) => {
      if (item === null) {
        return;
      } else {
        return item.image;
      }
    })
    .filter((n: any) => n);

  const date = new Date(createdAt);

  const totalIngredients = intersection.filter((n: any) => n);

  const allPrices = totalIngredients.map((i: any) => {
    if (i.type === "bun") {
      return i.price * 2;
    } else {
      return i.price;
    }
  });

  const totalPrice = allPrices.reduce((acc: any, i: any) => acc + i);

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
          <div className={styles.images}>
            {images.map((link: string) => (
              <div>
                <img className={styles.image} src={link} alt="ing" />
              </div>
            ))}
          </div>

          <span className={styles.total}>
            <CurrencyIcon type="primary" />
            <p className={styles.price}>{totalPrice}</p>
          </span>
        </div>
      </div>
    </Link>
  );
};
