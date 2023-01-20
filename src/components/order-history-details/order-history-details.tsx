import React, { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "../../utils/hooks";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./order-history-details.module.css";
import { Link } from "react-router-dom";
import { countSelector } from "../../services/selectors/selectors";
import { orderHistoryRequest } from "../../utils/api";
import { orderRequest } from "../../services/actions/order";

export const OrderHistoryDetails: FC = () => {
  // @ts-ignore
  const { number } = useParams();
  const orderNumber = Number(number);
  const dispatch = useDispatch();
  const location = useLocation();

  const [orderState, setOrderState] = useState();

  const { menu } = useSelector((state: any) => state.menu);
  const menuIngredients = menu.map((item: any) => item.item);
  const [...orders] = useSelector((state) => state.ws.data.orders);


  useEffect(() => {
    const orderInStoreCheck = orders?.find(
      (item: any) => item.number === orderNumber
    );
      setOrderState(orderInStoreCheck)
      dispatch(orderRequest(orderNumber));
  }, []);
  
  // @ts-ignore
  const orderRecieved = useSelector((state) => state.order.order);

  const finalResult = orderState  ? orderState : orderRecieved

  const { _id, name, ingredients, createdAt } = finalResult;

  const intersection = menuIngredients.map((item: any) =>
    ingredients.includes(item._id) ? item : null
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

  const totalIngredients = intersection.filter((n: any) => n);
  // console.log(totalIngredients);

  const allPrices = totalIngredients.map((i: any) => {
    if (i.type === "bun") {
      return i.price * 2;
    } else {
      return i.price;
    }
  });

  const totalPrice = allPrices.reduce((acc: any, i: any) => acc + i);
  const date = new Date(createdAt);

  return (
    <section>
      <div className={styles.card}>
        <div className={styles.title}>
          <span>{number}</span>
        </div>
        <h4> {name} </h4>
        <div className={styles.details}>
          <div className={styles.images}>
            СОСТАВ:
            <ul className={styles.list}>
              {totalIngredients.map((item: any) => (
                <li className={styles.list_item} key={images}>
                  <div className={styles.ingredient_item}>
                    <img className={styles.image} src={item.image} alt="ing" />
                    <span>{item.name}</span>
                  </div>
                  <span className={styles.count}>{item.price}</span>
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
    </section>
  );
};
