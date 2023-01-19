import React, { useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router";
import { OrderCard } from "../components/order-card/order-card";
import { connect } from "../services/actions/wsActions";
import { ORDER_ADD_DETAILS } from "../services/constants/order";
import { useDispatch, useSelector } from "../utils/hooks";

import styles from "./feed.module.css";

export const FeedPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const wsUrl = "wss://norma.nomoreparties.space/orders/all";

  useEffect(() => {
    dispatch(connect(wsUrl));
  }, [dispatch]);

  const { ...data } = useSelector((state) => state.ws.data);
  const total = useSelector((state) => state.ws.data.total);
  const totalToday = useSelector((state) => state.ws.data.totalToday);
  const orders: [] = { ...data.orders };

  const readyOrders = () => {
    let done = Object.values(orders).filter(
      (item: any) => item.status === "done"
    );
    let undone = Object.values(orders).filter(
      (item: any) => item.status === "soon"
    );
    return { done, undone };
  };

  let sortedOrders = readyOrders();

  return (
    <>
      <section className={styles.main}>
        <div className={styles.feed}>
          <h1> ЛЕНТА ЗАКАЗОВ </h1>
          {/* LIST */}
          {data.orders && (
            <ul className={styles.list}>
              {data.orders.map((order: any) => (
                <li
                  key={order._id}
                  onClick={() =>
                    dispatch({ type: ORDER_ADD_DETAILS, payload: order.number })
                  }
                >
                  {/* CARD */}
                  <OrderCard {...order} />
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* RIGHT SECTION  */}
        <div className={styles.total}>
          <div className={styles.statelists}>
            <span>READY:</span>
            <ul className={styles.statelist}>
              {sortedOrders.done.map((item: any) => (
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
