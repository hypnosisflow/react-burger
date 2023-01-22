import React, { useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router";
import { OrderCard } from "../components/order-card/order-card";
import { connect, disconnect } from "../services/actions/wsActions";
import { ORDER_ADD_DETAILS } from "../services/constants/order";
import { useDispatch, useSelector } from "../utils/store-type";
import { v4 as uuid } from "uuid";
import { TOrderInfo } from "../utils/types";
import styles from "./feed.module.css";

export const FeedPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const wsUrl = "wss://norma.nomoreparties.space/orders/all";

  useEffect(() => {
    dispatch(connect(wsUrl));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  const { orders, total, totalToday } = useSelector((state) => state.ws);

  const readyOrders = () => {
    let done = orders.filter((item) => item.status === "done");
    let undone = orders.filter((item) => item.status === "undone");
    return { done, undone };
  };

  let sortedOrders = readyOrders();

  if (!orders.length) {
    return <h1> Загрузка ...</h1>;
  }

  return (
    <>
      <section className={styles.main}>
        <div className={styles.feed}>
          <h1> ЛЕНТА ЗАКАЗОВ </h1>
          {/* LIST */}
          <ul className={styles.list}>
            {orders.map((order: TOrderInfo) => (
              <li
                key={uuid()}
                onClick={() =>
                  dispatch({ type: ORDER_ADD_DETAILS, payload: order.number })
                }
              >
                {/* CARD */}
                <OrderCard order={order} />
              </li>
            ))}
          </ul>
        </div>
        {/* RIGHT SECTION  */}
        <div className={styles.total}>
          <div className={styles.statelists}>
            <span>READY:</span>
            <ul className={styles.statelist}>
              {sortedOrders.done.map((item: TOrderInfo) => (
                <li>{item.number}</li>
              ))}
            </ul>
            <span>SOON:</span>
            <ul className={styles.statelist}>
              <li>31231231231</li>
              <li>8787878</li>
              <li>57854</li>
            </ul>
          </div>
          <div className={styles.alltime}>
            <span>Выполнено за все время:</span>
            <span className={styles.number}>{total}</span>
          </div>
          <div className={styles.today}>
            <span>Выполнено за сегодня:</span>
            <span className={styles.number}>{totalToday}</span>
          </div>
        </div>
      </section>
    </>
  );
};
